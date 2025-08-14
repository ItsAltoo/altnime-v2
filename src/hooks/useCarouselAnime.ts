import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";
import { fetchAnimeData, animeCache } from "@/services/api";
import { Anime } from "@/types";

interface UseFetchAnimeResult {
  animes: Anime[];
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook untuk mengambil daftar anime dari API Jikan.
 * Mengelola state loading, error, dan data, serta caching.
 * @param {string} filter - Filter untuk API (e.g., 'airing').
 * @param {number} limit - Jumlah maksimum anime yang ingin diambil.
 * @returns {UseFetchAnimeResult} Objek yang berisi animes, loading, dan error.
 */
export const useFetchAnime = (
  filter: string,
  limit: number
): UseFetchAnimeResult => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cancelTokenSource: CancelTokenSource = axios.CancelToken.source();
    const cacheKey = `${filter}-${limit}`;

    const getAnime = async () => {
      // 1. Set state awal
      setLoading(true);
      setError(null);

      // 2. Cek cache terlebih dahulu
      if (animeCache.has(cacheKey)) {
        setAnimes(animeCache.get(cacheKey)!);
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
          setAnimes(result);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
          return;
        }

        console.error("Failed to fetch anime in hook:", err);

        // Penanganan error yang lebih spesifik
        let errorMessage = "Gagal memuat data anime. Silakan coba lagi nanti.";
        if (err instanceof Error) {
          if (err.message.includes("429")) {
            errorMessage = "Terlalu banyak permintaan. Menunggu sebentar...";
          } else if (err.message.includes("timeout")) {
            errorMessage = "Koneksi timeout. Periksa internet Anda.";
          } else if (err.message.includes("Network Error")) {
            errorMessage = "Masalah jaringan. Periksa koneksi internet Anda.";
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
