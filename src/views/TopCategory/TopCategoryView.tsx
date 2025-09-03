"use client";
import React, { Suspense } from "react";
import { AnimeCard } from "@/components/Card/Card";
import { PaginationComponent } from "@/components/Pagination";
import Grid from "../Seasons/Grid";
import Loading from "../Seasons/layout/AnimeListLoad";
import { useParams, useSearchParams } from "next/navigation";
import { useTopCategory } from "@/lib/hooks/useTopCategory";

export const AnimeList = ({ limit }: { limit: number }) => {
  const { category } = useParams();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "";

  const { topAnimes, loading, error, page, setPage, totalPages } =
    useTopCategory(category as string, limit, filter);

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
        {topAnimes.map((anime) => (
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
              category={`${category}`}
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
