import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  CancelToken,
} from "axios";
import { Anime } from "@/types";

export const jikan = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
});

const createAxiosInstance = (): AxiosInstance => {
  let requestCount = 0;
  setInterval(() => {
    requestCount = 0;
  }, 60000);

  jikan.interceptors.request.use(
    async (config) => {
      if (requestCount >= 60) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      requestCount++;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return config;
    },
    (error) => Promise.reject(error)
  );

  jikan.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const config = error.config as AxiosRequestConfig & {
        _retryCount?: number;
      };
      if (!config) return Promise.reject(error);
      config._retryCount = config._retryCount || 0;
      const shouldRetry =
        config._retryCount < 3 &&
        (error.response?.status === 429 ||
          error.response?.status === 500 ||
          error.code === "ECONNABORTED");
      if (shouldRetry) {
        config._retryCount++;
        const delay = Math.min(1000 * 2 + Math.random() * 1000, 10000);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return jikan.request(config);
      }
      return Promise.reject(error);
    }
  );
  return jikan;
};

export const axiosInstance = createAxiosInstance();
export const animeCache = new Map<string, any>();
const etagCache = new Map<string, string>();
const excludedGenres = [12, 49];

export const fetchAnimeData = async (
  filter: string,
  limit: number,
  cancelToken: CancelToken
): Promise<Anime[]> => {
  const cacheKey = `${filter}-${limit}`;
  if (animeCache.has(cacheKey)) {
    return animeCache.get(cacheKey)!;
  }
  const uniqueMap = new Map<number, Anime>();
  let page = 1;
  while (uniqueMap.size < limit && page <= 5) {
    const response = await axiosInstance.get("/top/anime", {
      params: { filter, limit: 25, page },
      cancelToken,
    });
    response.data?.data?.forEach((anime: Anime) => {
      const hasExcludedGenre = anime.genres?.some((g) =>
        excludedGenres.includes(g.mal_id)
      );
      if (!hasExcludedGenre && !uniqueMap.has(anime.mal_id)) {
        uniqueMap.set(anime.mal_id, anime);
      }
    });
    page++;
  }
  const finalData = Array.from(uniqueMap.values()).slice(0, limit);
  animeCache.set(cacheKey, finalData);
  return finalData;
};
