import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";
import { fetchAnimeData, animeCache } from "@/services/api";
import { Anime } from "@/types";

interface UseFetchAnimeResult {
  animes: Data[];
  loading: boolean;
  error: string | null;
}

interface Data extends Anime {
  name: string;
  chapters?: number;
  volumes?: number;
  status?: string;
}

export const useFetchAnime = (
  filter: string,
  limit: number
): UseFetchAnimeResult => {
  const [animes, setAnimes] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cancelTokenSource: CancelTokenSource = axios.CancelToken.source();
    const cacheKey = `${filter}-${limit}`;

    const getAnime = async () => {
      setLoading(true);
      setError(null);

      // 2. Cek cache terlebih dahulu
      if (animeCache.has(cacheKey)) {
        setAnimes(animeCache.get(cacheKey)! as Data[]);
        setLoading(false);
        return;
      }

      try {
        // 3. Panggil service untuk mengambil data
        const result = await fetchAnimeData(
          filter,
          limit,
          cancelTokenSource.token
        );

        // Pastikan komponen masih mounted sebelum update state
        if (!cancelTokenSource.token.reason) {
          setAnimes(result as Data[]);
        }
      } catch (err) {
        // Ignore canceled requests
        if (axios.isCancel(err)) {
          return;
        }

        console.error("Failed to fetch anime in hook:", err);

        // Penanganan error yang lebih spesifik
        let errorMessage = "Failed to load anime data. Please try again later.";
        if (err instanceof Error) {
          if (err.message.includes("429")) {
            errorMessage = "Too many requests. Please wait a moment...";
          } else if (err.message.includes("timeout")) {
            errorMessage = "Connection timed out. Please check your internet.";
          } else if (err.message.includes("Network Error")) {
            errorMessage =
              "Network issue. Please check your internet connection.";
          }
        }

        if (!cancelTokenSource.token.reason) {
          setError(errorMessage);
        }
      } finally {
        // 4. Set loading ke false setelah selesai
        if (!cancelTokenSource.token.reason) {
          setLoading(false);
        }
      }
    };

    getAnime();

    // 5. Fungsi cleanup untuk membatalkan request jika komponen unmount
    return () => {
      cancelTokenSource.cancel("Component unmounted, request cancelled.");
    };
  }, [filter, limit]); // Jalankan ulang effect jika filter atau limit berubah

  return { animes, loading, error };
};
