import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Anime } from "@/types";
import { jikan } from "@/services/api";

export function useSeasonAnime(year: number, season: string) {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(pageParam);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");

    const targetCount = 24;
    const excludedGenres = [12, 49];
    const uniqueMap = new Map<number, Anime>();

    const fetchPage = (currentPage: number) => {
      jikan
        .get(`/seasons/${year}/${season}`, {
          params: {
            limit: 25,
            page: currentPage,
          },
        })
        .then((res) => {
          const data = res.data;

          if (!data?.data?.length || data.data.length === 0) {
            if (isMounted) setError("No anime data found.");
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
              uniqueMap.set(anime.mal_id, anime);
            }
          });

          // kalau masih kurang dari target dan belum sampai akhir halaman, lanjut fetch
          if (
            uniqueMap.size < targetCount &&
            currentPage < data.pagination.last_visible_page
          ) {
            fetchPage(currentPage + 1);
          } else {
            if (isMounted) {
              setAnimes(Array.from(uniqueMap.values()));
              setLoading(false);
            }
          }
        })
        .catch((err) => {
          if (isMounted) {
            setError(err.message);
            setLoading(false);
          }
        });
    };

    fetchPage(page);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    params.set("year", String(year));
    router.replace(`?year=${year}&page=${page}`);

    return () => {
      isMounted = false;
    };
  }, [year, season, page]);

  return { animes, loading, error, totalPages, page, setPage };
}
