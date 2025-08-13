import { useEffect, useState } from "react";
import jikan from "@/lib/api";

export function useJikanFetch<T = any>(
  endpoint: string,
  params?: Record<string, any>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    jikan
      .get(endpoint, { params })
      .then((res) => {
        if (isMounted) setData(res.data.data);
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
  }, [endpoint, JSON.stringify(params)]);

  return { data, loading, error };
}
