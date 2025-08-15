"use client";
import React from "react";
import { AnimeCard } from "@/components/Card";
import Grid from "../Grid";
import { PaginationComponent } from "@/components/Pagination";
import Loading from "./AnimeListLoad";
import { useSeasonAnime } from "@/hooks/useSeasonAnime";

export const AnimeList = ({
  year,
  season,
}: {
  year: number;
  season: string;
}) => {
  const { animes, loading, error, page, setPage, totalPages } = useSeasonAnime(
    year,
    season
  );

  if (loading) return <Loading />;
  else if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl">{error} Try Again.</p>
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
            mal_id={anime.mal_id}
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
