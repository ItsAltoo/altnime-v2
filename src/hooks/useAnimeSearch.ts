import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { jikan } from "@/services/api";
import { Anime } from "@/types";

export const useHandleSearch = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim() || query.trim().length < 3) {
      alert("Please enter at least 3 characters.");
      return;
    }

    router.push(`/search?q=${query}`);
    setQuery("");
  };

  return {
    query,
    setQuery,
    handleSearch,
  };
};

interface Data extends Anime {
  name: string;
  chapters?: number;
  volumes?: number;
  status?: string;
}

export const useAnimeSearch = ({ limit }: { limit: number }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q") || "";
  const [totalPages, setTotalPages] = useState(1);
  const [results, setResults] = useState<Data[]>([]);

  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(pageParam);

  useEffect(() => {
    if (!query?.trim()) {
      return;
    }
    let isMounted = true;
    setLoading(true);
    setError("");

    const targetCount = limit;
    const excludedGenres = [12, 49];
    const uniqueMap = new Map<number, Data>();

    const fetchSearchResults = async (currentPage: number) => {
      jikan
        .get(`/anime`, { params: { q: query, page: currentPage } })
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
            fetchSearchResults(currentPage + 1);
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

    fetchSearchResults(page);

    return () => {
      isMounted = false;
    };
  }, [query, page]);

  return { results, loading, error, page, totalPages, setPage };
};
