"use client";
import { ArrowRight, ArrowUpRight, BookIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HeroSkeleton } from "./HeroLoading";
import { useHero } from "@/lib/hooks/useHeroAnime";

const Hero = () => {
  const { topAnimes, loading, error } = useHero({
    filter: "airing",
    limit: 5,
  });

  if (loading) {
    return <HeroSkeleton />;
  } else if (topAnimes.length === 0 || error) {
    return (
      <section className="flex h-[80vh] items-center justify-center">
        <div className="container text-center">
          There is no data for currently airing anime.
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="container mx-auto">
        <Carousel
          plugins={[
            Autoplay({
              delay: 4500,
            }),
          ]}
          className="w-full relative"
        >
          <CarouselContent>
            {topAnimes.map((anime) => (
              <CarouselItem
                key={anime.mal_id}
                className="relative h-screen items-center justify-center flex overflow-hidden"
              >
                <Image
                  src={anime.images.webp.image_url}
                  alt={`${anime.title} background`}
                  fill
                  sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw"
                  className="object-cover -z-10 blur-xs brightness-[0.2] opacity-75"
                  priority={topAnimes.indexOf(anime) === 0}
                />
                <div className="flex flex-col-reverse items-center justify-around gap-8 p-1 lg:flex-row w-full">
                  <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                    <Badge variant="outline">
                      Top Airing Anime
                      <ArrowUpRight className="ml-2 size-4" />
                    </Badge>
                    <h1 className="my-6 max-w-2xl text-pretty text-3xl font-bold lg:text-5xl">
                      {anime.title}
                    </h1>
                    <p className="text-muted-foreground mb-8 max-w-xl break-words text-sm line-clamp-4 lg:text-base">
                      {anime.synopsis || "No synopsis available."}
                    </p>
                    <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                      <Button asChild className="w-full sm:w-auto">
                        <Link href={`/anime/${anime.mal_id}`}>
                          View Details
                          <ArrowRight className="ml-2 size-4" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full sm:w-auto"
                      >
                      </Button>
                    </div>
                  </div>
                  <Image
                    src={anime.images.webp.image_url}
                    alt={anime.title}
                    width={288}
                    height={432}
                    className="max-h-80 w-auto rounded-md object-cover"
                    priority={topAnimes.indexOf(anime) === 0} // Prioritaskan gambar pertama
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex cursor-pointer" />
          <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex cursor-pointer" />
        </Carousel>
      </div>
    </section>
  );
};

export { Hero };
