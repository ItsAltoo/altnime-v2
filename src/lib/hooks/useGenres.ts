import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { jikan } from "@/services/api";
import { Anime } from "@/types";

interface Data extends Anime {
  name: string;
  chapters?: number;
  volumes?: number;
  status?: string;
}

interface Genre {
  mal_id: number;
  name: string;
  url: string;
  count: number;
}

export const useGenres = ({ id, limit }: { id: number; limit: number }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const router = useRouter();

  const [totalPages, setTotalPages] = useState(1);
  const [results, setResults] = useState<Data[]>([]);

  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(pageParam);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");

    const targetCount = limit;
    const excludedGenres = [12, 49];
    const uniqueMap = new Map<number, Data>();

    const fetchGenresResults = async (currentPage: number) => {
      jikan
        .get(`/anime`, { params: { genres: id, page: currentPage } })
        .then((res) => {
          const data = res.data;

          if (!data?.data?.length || data.data.length === 0) {
            if (isMounted) setError("No anime data found.");
            return;
          }

          // set total pages dari halaman awal saja
          if (currentPage === page && isMounted) {
            setTotalPages(data.pagination.last_visible_page);
          }

          // filter & simpan anime unik
          data.data.forEach((anime: Anime) => {
            if (uniqueMap.size >= targetCount) return;
            const hasExcludedGenre = anime.genres?.some((genre) =>
              excludedGenres.includes(genre.mal_id)
            );
            if (!hasExcludedGenre && !uniqueMap.has(anime.mal_id)) {
              uniqueMap.set(anime.mal_id, anime as Data);
            }
          });

          // kalau masih kurang dari target dan belum sampai akhir halaman, lanjut fetch
          if (
            uniqueMap.size < targetCount &&
            currentPage < data.pagination.last_visible_page
          ) {
            fetchGenresResults(currentPage + 1);
          } else {
            if (isMounted) {
              setResults(Array.from(uniqueMap.values()));
              setLoading(false);
            }
          }
        })
        .catch((err) => {
          if (isMounted) {
            setError(err.message);
            setLoading(false);
          }
        })
        .finally(() => {
          if (isMounted) {
            setLoading(false);
          }
        });
    };

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.replace(`?${params.toString()}`);

    fetchGenresResults(page);

    return () => {
      isMounted = false;
    };
  }, [id, page, limit]);

  useEffect(() => {
    jikan.get(`/genres/anime`).then((res) => {
      const genresData = res.data.data;
      const genreTitle =
        genresData.find((g: Genre) => g.mal_id === id)?.name || "Genre";
      setGenres(genresData);
      setSelectedGenre(genreTitle);
    });
  }, [id]);

  return {
    results,
    loading,
    error,
    page,
    totalPages,
    setPage,
    genres,
    selectedGenre,
  };
};
