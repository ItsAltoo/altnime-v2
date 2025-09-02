import { animeCache, fetchAnimeData } from "@/services/api";
import { Anime } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export function useHero({ limit, filter }: { limit: number; filter: string }) {
  const [topAnimes, setTopAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    const cacheKey = `${filter}-${limit}`;

    if (animeCache.has(cacheKey)) {
      setTopAnimes(animeCache.get(cacheKey)! as Anime[]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAnimeData(
          filter,
          limit,
          cancelTokenSource.token
        );
        if (!cancelTokenSource.token.reason) {
          setTopAnimes(data);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit, filter]);
  return { topAnimes, loading, error };
}
