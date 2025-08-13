import jikan from "@/lib/api";
import { Anime } from "@/types";
import { useEffect, useState } from "react";

export function useTopAnime({limit} : {limit : number}) {
  const [topAnimes, setTopAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    jikan
      .get(`top/anime?filter=airing&limit=${limit}`)
      .then((res) => {
        if (res.data && res.data.data && res.data.data.length > 0) {
          setTopAnimes(res.data.data);
        }
      })
      .catch((error) => {
        setError(`Failed to fetch top anime: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [limit]);
  return { topAnimes, loading, error };
}
