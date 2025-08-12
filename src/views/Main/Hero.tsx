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
import Autoplay from "embla-carousel-autoplay"; // Import plugin autoplay
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image"; // Gunakan Next/Image untuk optimasi
import { HeroSkeleton } from "./HeroLoading";

interface Anime {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string; large_image_url: string } };
  score: number;
  episodes: number;
  type: string;
  url: string;
  synopsis: string;
  background: string;
}

const Hero = () => {
  // Ubah state untuk menampung array of Anime
  const [topAnimes, setTopAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopAnimes = async () => {
      try {
        // Ubah limit untuk mendapatkan beberapa anime untuk carousel
        const res = await axios.get(
          "https://api.jikan.moe/v4/top/anime?filter=airing&limit=5"
        );
        if (res.data && res.data.data && res.data.data.length > 0) {
          // Set seluruh data array ke state
          setTopAnimes(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching top anime:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopAnimes();
  }, []);

  if (loading) {
    return (
      <HeroSkeleton />
    );
  }

  // Ubah kondisi untuk memeriksa jika array kosong
  if (topAnimes.length === 0) {
    return (
      <section className="flex h-[80vh] items-center justify-center">
        <div className="container text-center">
          Tidak ada data anime yang sedang tayang.
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
                {/* 2. Tambahkan gambar sebagai background */}
                <Image
                  src={anime.images.jpg.large_image_url}
                  alt={`${anime.title} background`}
                  fill
                  className="object-cover -z-10 blur-xs brightness-[0.2]"
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
                        <Link href={anime.url} target="_blank">
                          <BookIcon className="mr-2 size-4" />
                          Bookmark
                        </Link>
                      </Button>
                    </div>
                  </div>
                  {/* Gunakan Next/Image untuk performa lebih baik */}
                  <Image
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    width={288} // setara w-72
                    height={432} // setara h-auto dengan rasio umum
                    className="max-h-[65vh] w-auto rounded-md object-cover"
                    priority={topAnimes.indexOf(anime) === 0} // Prioritaskan gambar pertama
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex " />
          <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export { Hero };
