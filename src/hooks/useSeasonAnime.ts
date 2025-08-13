import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Anime } from "@/types";
import jikan from "@/lib/api";

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
    setLoading(true);
    setError("");
    const targetCount = 24;
    const excludedGenres = [12, 49];
    let uniqueMap = new Map<number, Anime>();
    let currentPage = page;
    let allDataFetched = false;
    let isMounted = true;

    while (uniqueMap.size < targetCount && !allDataFetched) {
      jikan
        .get(`/seasons/${year}/${season}`, {
          params: {
            limit: 25,
            page: currentPage,
          },
        })
        .then((res) => {
          const data = res.data;
          if (!data || !data.data || data.data.length === 0) {
            allDataFetched = true;
            setError("Tidak ada data anime yang ditemukan.");
          }

          data.data.forEach((anime: Anime) => {
            if (uniqueMap.size >= targetCount) return;

            const hasExcludedGenre = anime.genres?.some((genre) =>
              excludedGenres.includes(genre.mal_id)
            );

            if (!hasExcludedGenre && !uniqueMap.has(anime.mal_id)) {
              uniqueMap.set(anime.mal_id, anime);
            }
          });

          if (currentPage === page) {
            setTotalPages(data.pagination.last_visible_page);
          }

          if (currentPage >= data.pagination.last_visible_page) {
            allDataFetched = true;
          } else {
            currentPage++;
          }
          setAnimes(Array.from(uniqueMap.values()).slice(0, targetCount));
        })
        .catch((err) => {
          if (isMounted) setError(err.message);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
      return () => {
        isMounted = false;
      };
    }

    // update query string "page" di URL
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.replace(`?${params.toString()}`);
  }, [year, season, page]);

  return { animes, loading, error, totalPages, page, setPage };
}
