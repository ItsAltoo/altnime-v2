"use client";
import React, { useEffect, useState } from "react";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AnimeCard } from "./Card";
import { CardCarouselSkeleton } from "./CardCarouselLoad";
import { Anime,AnimeCarouselProps } from "@/types";

const excludedGenres = [12, 49];
// Global cache
const animeCache = new Map<string, Anime[]>();
const etagCache = new Map<string, string>();

// Custom Axios instance dengan interceptor
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: "https://api.jikan.moe/v4",
    timeout: 15000, // 15 detik timeout
  });

  let requestCount = 0;
  const MAX_REQUESTS_PER_MINUTE = 60;
  const REQUEST_INTERVAL = 60000; // 1 menit

  // Reset counter setiap menit
  setInterval(() => {
    requestCount = 0;
  }, REQUEST_INTERVAL);

  // Request interceptor untuk rate limiting
  instance.interceptors.request.use(
    async (config) => {
      // Rate limiting check
      if (requestCount >= MAX_REQUESTS_PER_MINUTE) {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
      }

      requestCount++;

      // Add delay between requests
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor untuk retry otomatis
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const config = error.config as AxiosRequestConfig & {
        _retryCount?: number;
        _retryDelay?: number;
      };

      if (!config) {
        return Promise.reject(error);
      }

      // Initialize retry config
      config._retryCount = config._retryCount || 0;
      config._retryDelay = config._retryDelay || 1000;

      const maxRetries = 3;
      const maxRetryDelay = 10000; // 10 detik maksimal

      // Conditions for retry
      const shouldRetry =
        config._retryCount < maxRetries &&
        (error.response?.status === 429 || // Rate limit
          error.response?.status === 500 || // Server error
          error.response?.status === 502 || // Bad gateway
          error.response?.status === 503 || // Service unavailable
          error.code === "ECONNABORTED" || // Timeout
          !error.response); // Network error

      if (shouldRetry) {
        config._retryCount++;

        // Exponential backoff dengan jitter
        const delay = Math.min(
          config._retryDelay * Math.pow(2, config._retryCount - 1) +
            Math.random() * 1000, // Add jitter
          maxRetryDelay
        );

        console.log(
          `Retry attempt ${config._retryCount} for ${config.url} after ${delay}ms delay`
        );

        await new Promise((resolve) => setTimeout(resolve, delay));

        // Special handling untuk rate limit (429)
        if (error.response?.status === 429) {
          const retryAfter = error.response.headers["retry-after"];
          const retryDelay = retryAfter ? parseInt(retryAfter) * 1000 : delay;
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }

        return instance.request(config);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance();

export function AnimeCarousel({
  title,
  filter = "",
  limit = 18,
}: AnimeCarouselProps) {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    const fetchAnime = async () => {
      setLoading(true);
      setError("");

      const cacheKey = `${filter}-${limit}`;

      // Cek cache terlebih dahulu
      if (animeCache.has(cacheKey)) {
        setAnimes(animeCache.get(cacheKey)!);
        setLoading(false);
        return;
      }

      try {
        const result = await fetchAnimeData(
          cacheKey,
          filter,
          limit,
          cancelTokenSource.token
        );

        if (cancelTokenSource.token.reason) return;

        setAnimes(result);
      } catch (err) {
        if (axios.isCancel(err)) return;

        console.error("Gagal fetch anime:", err);

        if (err instanceof Error) {
          if (err.message.includes("429")) {
            setError("Terlalu banyak permintaan. Sedang mencoba ulang...");
            // Auto retry dengan delay lebih lama
            setTimeout(() => {
              if (!cancelTokenSource.token.reason) {
                fetchAnime();
              }
            }, 5000);
            return;
          }

          if (err.message.includes("timeout")) {
            setError("Koneksi timeout. Coba lagi nanti.");
          } else if (err.message.includes("Network Error")) {
            setError("Masalah jaringan. Periksa koneksi internet Anda.");
          } else {
            setError("Gagal memuat data anime.");
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();

    return () => {
      cancelTokenSource.cancel("Component unmounted");
    };
  }, [filter, limit]);

  if (loading) {
    return <CardCarouselSkeleton />;
  } else if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="py-8 px-4 md:px-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4 border-l-4 pl-4 border-primary">
        {title}
      </h2>
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 2,
        }}
        className="w-full relative"
      >
        <div className="overflow-hidden">
          <CarouselContent className="-ml-4">
            {animes.map((anime) => (
              <CarouselItem
                key={anime.mal_id}
                // 3. Tentukan lebar item untuk setiap ukuran layar (Mobile-First)
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <AnimeCard
                  title={anime.title}
                  imageUrl={anime.images.jpg.image_url}
                  score={anime.score}
                  episodes={anime.episodes}
                  type={anime.type}
                  mal_id={anime.mal_id}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>

        {/* 4. Sembunyikan tombol di mobile dan tampilkan di layar lebih besar */}
        <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
      </Carousel>
    </div>
  );
}

async function fetchAnimeData(
  cacheKey: string,
  filter: string,
  limit: number,
  cancelToken: any
): Promise<Anime[]> {
  const uniqueMap = new Map<number, Anime>();
  let page = 1;
  const maxPages = 5;

  while (uniqueMap.size < limit && page <= maxPages) {
    if (cancelToken.reason) {
      throw new axios.Cancel("Request cancelled");
    }

    try {
      // Prepare request config
      const config: AxiosRequestConfig = {
        url: "/top/anime",
        method: "GET",
        params: {
          ...(filter && { filter }),
          limit: 25,
          page,
        },
        cancelToken,
        headers: {},
      };

      // Add ETag header if available
      const etag = etagCache.get(`${cacheKey}-${page}`);
      if (etag) {
        config.headers!["If-None-Match"] = etag;
      }

      const response = await axiosInstance.request(config);

      // Handle 304 Not Modified
      if (response.status === 304) {
        const cachedData = animeCache.get(`${cacheKey}-${page}`);
        if (cachedData) {
          cachedData.forEach((anime) => {
            if (!uniqueMap.has(anime.mal_id)) {
              uniqueMap.set(anime.mal_id, anime);
            }
          });
        }
        page++;
        continue;
      }

      const data = response.data;

      if (!data?.data?.length) {
        break; // Tidak ada data lagi
      }

      // Simpan ETag untuk caching
      const newEtag = response.headers["etag"];
      if (newEtag) {
        etagCache.set(`${cacheKey}-${page}`, newEtag);
      }

      // Filter dan tambahkan anime
      const pageAnimes: Anime[] = [];
      data.data.forEach((anime: Anime) => {
        const hasExcludedGenre = anime.genres?.some((genre) =>
          excludedGenres.includes(genre.mal_id)
        );

        if (!hasExcludedGenre && !uniqueMap.has(anime.mal_id)) {
          uniqueMap.set(anime.mal_id, anime);
          pageAnimes.push(anime);
        }
      });

      // Cache data per halaman
      animeCache.set(`${cacheKey}-${page}`, pageAnimes);

      page++;
    } catch (error) {
      if (axios.isCancel(error)) {
        throw error;
      }

      // Error handling sudah ditangani oleh interceptor
      // Jika masih error di sini, berarti sudah max retry
      console.error(`Failed to fetch page ${page}:`, error);

      if (page === 1) {
        // Jika halaman pertama gagal, throw error
        throw error;
      } else {
        // Jika bukan halaman pertama, lanjutkan dengan data yang ada
        break;
      }
    }
  }

  const finalData = Array.from(uniqueMap.values()).slice(0, limit);

  // Cache hasil akhir
  animeCache.set(cacheKey, finalData);

  return finalData;
}
