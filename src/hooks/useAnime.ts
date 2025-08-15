import { animeCache, axiosInstance } from "@/services/api";
import { AnimeDetail } from "@/types";
import { CancelToken } from "axios";

/**
 * BARU: Fungsi untuk mengambil detail anime berdasarkan ID.
 * @param {number} id - MAL ID dari anime.
 * @param {CancelToken} cancelToken - Token untuk membatalkan request.
 * @returns {Promise<AnimeDetail>} Detail dari sebuah anime.
 */
export const fetchAnimeById = async (
  id: number,
  cancelToken: CancelToken
): Promise<AnimeDetail> => {
  const cacheKey = `anime-detail-${id}`;
  if (animeCache.has(cacheKey)) {
    return animeCache.get(cacheKey)!;
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
