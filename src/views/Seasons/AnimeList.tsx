"use client";
import { AnimeCard } from "@/components/Card";
import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import { PaginationComponent } from "@/components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "./loading";

interface Anime {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string } };
  score: number;
  episodes: number;
  type: string;
  url: string;
  genres: { mal_id: number }[];
}

interface AnimeListProps {
  year: string;
  season: string;
}

export const AnimeList: React.FC<AnimeListProps> = ({ year, season }) => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(pageParam);

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      setError("");
      const targetCount = 24;
      const excludedGenres = [12, 49]; // mal_id genres
      let uniqueMap = new Map<number, Anime>();
      let currentPage = page;
      let allDataFetched = false;

      try {
        // Fetch multiple pages if needed to get exactly 24 anime
        while (uniqueMap.size < targetCount && !allDataFetched) {
          const res = await fetch(
            `https://api.jikan.moe/v4/seasons/${year}/${season}?limit=25&page=${currentPage}`
          );
          const data = await res.json();

          if (!data || !data.data || data.data.length === 0) {
            allDataFetched = true;
            break;
          }

          data.data.forEach((anime: Anime) => {
            // Skip if already have enough anime
            if (uniqueMap.size >= targetCount) return;

            const hasExcludedGenre = anime.genres?.some((genre) =>
              excludedGenres.includes(genre.mal_id)
            );

            if (!hasExcludedGenre && !uniqueMap.has(anime.mal_id)) {
              uniqueMap.set(anime.mal_id, anime);
            }
          });

          // Set total pages from the first fetch
          if (currentPage === page) {
            setTotalPages(data.pagination.last_visible_page);
          }

          // Check if we've reached the last page
          if (currentPage >= data.pagination.last_visible_page) {
            allDataFetched = true;
          } else {
            currentPage++;
          }
        }

        const uniqueAnimes = Array.from(uniqueMap.values()).slice(
          0,
          targetCount
        );
        setAnimes(uniqueAnimes);
      } catch (err) {
        setError("Gagal memuat data anime.");
      } finally {
        setLoading(false);
      }
    };
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));

    router.replace(`?${params.toString()}`);

    fetchAnime();
  }, [year, season, page]);

  if (loading) return <Loading />;
  else if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl">{error} Silahkan coba lagi.</p>
      </div>
    );

  return (
    <>
      <Grid>
        {animes.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            title={anime.title}
            imageUrl={anime.images.jpg.image_url}
            score={anime.score}
            episodes={anime.episodes}
            type={anime.type}
            url={anime.url}
          />
        ))}
      </Grid>

      <div className="mt-6 flex justify-center">
        <PaginationComponent
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </>
  );
};
