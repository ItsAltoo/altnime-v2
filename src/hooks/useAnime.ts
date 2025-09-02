import { animeCache, axiosInstance } from "@/services/api";
import {  AnimeDetail } from "@/types";
import { CancelToken } from "axios";

export const fetchAnimeById = async (
  id: number,
  cancelToken: CancelToken
): Promise<AnimeDetail> => {
  const cacheKey = `anime-detail-${id}`;
  if (animeCache.has(cacheKey)) {
    return animeCache.get(cacheKey)! as AnimeDetail;
  }

  try {
    const response = await axiosInstance.get(`/anime/${id}/full`, {
      cancelToken,
    });

    const animeDetail = response.data.data;
    animeCache.set(cacheKey, animeDetail); 
    return animeDetail;
  } catch (error) {
    console.error(`Gagal mengambil detail untuk anime ID ${id}:`, error);
    throw error;
  }
};
