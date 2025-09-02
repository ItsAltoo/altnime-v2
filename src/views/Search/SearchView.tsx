"use client";
import React, { Suspense } from "react";
import { AnimeCard } from "@/components/Card/Card";
import { PaginationComponent } from "@/components/Pagination";
import Grid from "../Seasons/Grid";
import { useAnimeSearch } from "@/hooks/useAnimeSearch";
import Loading from "../Seasons/layout/AnimeListLoad";

export const AnimeList = ({ limit }: { limit: number }) => {
  const { results, loading, error, page, setPage, totalPages } = useAnimeSearch(
    { limit }
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
        {results.map((anime) => (
          <Suspense key={anime.mal_id}>
            <AnimeCard
              status={anime.status}
              title={anime.title}
              name={anime.name}
              imageUrl={anime.images.webp.image_url}
              score={anime.score}
              episodes={anime.episodes}
              chapters={anime.chapters}
              type={anime.type}
              mal_id={anime.mal_id}
            />
          </Suspense>
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
