"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AnimeCard } from "./Card";
import { CardCarouselSkeleton } from "./CardCarouselLoad";
import { AnimeCarouselProps } from "@/types";
import { useFetchAnime } from "@/lib/hooks/useCarouselAnime";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function AnimeCarousel({
  title,
  filter = "",
  limit = 18,
}: AnimeCarouselProps) {
  const { animes, loading, error } = useFetchAnime(filter, limit);

  if (loading) {
    return <CardCarouselSkeleton />;
  } else if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold border-l-4 pl-4 border-primary">
          {title}
        </h2>
        <div className="flex w-fit gap-1 font-semibold hover:text-secondary hover:underline">
          <Link className="flex" href={`/top/anime?filter=${filter}`}>
            View More
            <ChevronRight />
          </Link>
        </div>
      </div>

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
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <AnimeCard
                  status={anime.status}
                  title={anime.title}
                  imageUrl={anime.images.webp.image_url}
                  score={anime.score}
                  episodes={anime.episodes}
                  type={anime.type}
                  mal_id={anime.mal_id}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>

        <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex cursor-pointer" />
        <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex cursor-pointer" />
      </Carousel>
    </div>
  );
}
