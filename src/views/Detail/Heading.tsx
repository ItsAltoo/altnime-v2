"use client";
import BookmarkButton from "@/components/BookmarkButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeadingDetailProps } from "@/types";
import { ArrowLeft, Heart, Home, Star, Trophy, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Heading: React.FC<HeadingDetailProps> = ({
  mal_id,
  title,
  name,
  poster,
  background,
  genres,
  episodes,
  chapters,
  type,
  aired = { prop: { from: { year: 0 }, to: { year: 0 } } },
  published = { prop: { from: { year: 0 }, to: { year: 0 } } },
  info,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="absolute inset-0 h-60 md:h-72 -z-10">
        {background && (
          <Image
            src={background}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw"
            className="object-cover w-full h-full blur-sm brightness-50"
            priority
            unoptimized={true}
          />
        )}
      </div>

      <div className="border-b pb-10 md:pb-20">
        {/* navigation */}
        <div className="mb-5 w-full h-14 flex items-center justify-between">
          <Button
            size="circle"
            className="cursor-pointer"
            onClick={() => {
              if (window.history.length > 1) {
                router.back();
              } else {
                router.push("/");
              }
            }}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <Button
            size="circle"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Home className="size-5" />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
          <Image
            src={poster}
            alt={title || name}
            width={300}
            height={450}
            className="w-40 md:w-52 h-auto rounded-lg flex-shrink-0"
            sizes="(max-width: 768px) 40vw, 208px"
            priority
            unoptimized={true}
          />

          <div className="flex flex-col justify-between w-full md:h-80">
            <h1 className="text-3xl md:text-5xl font-bold line-clamp-2 text-center md:text-left">
              {title || name}
            </h1>

            <div className="flex flex-col gap-3 ">
              <div className="text-sm md:text-md flex flex-col items-center md:items-start gap-1">
                {aired.prop.from.year > 0 && aired.prop.to.year > 0 && (
                  <p className="tracking-wide">
                    {aired.prop.from.year} - {aired.prop.to.year}
                  </p>
                )}

                {published.prop.from.year > 0 && published.prop.to.year > 0 && (
                  <p className="tracking-wide">
                    {published.prop.from.year} - {published.prop.to.year}
                  </p>
                )}

                {episodes && (
                  <p className="tracking-wide">Episodes: {episodes || "N/A"}</p>
                )}

                {chapters && (
                  <p className="tracking-wide">Chapters: {chapters}</p>
                )}
                {type && <p className="tracking-wide">Type: {type}</p>}

                {info.status && (
                  <Badge className="tracking-wide mt-1" variant={"outline"}>
                    {info.status}
                  </Badge>
                )}
              </div>

              {/* Genre Badges: Dibuat wrap dan justify center di mobile */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {genres &&
                  genres.map((genre) => (
                    <Link href={`/genres/${genre.mal_id}`} key={genre.mal_id}>
                      <Badge
                        variant={"outline"}
                        className="px-3 py-1 text-xs md:text-sm font-bold tracking-wide"
                      >
                        {genre.name}
                      </Badge>
                    </Link>
                  ))}
              </div>

              {/* AKSI & STATS: Stacked di mobile, side-by-side di desktop */}
              <div className="flex flex-col md:flex-row items-center md:items-end justify-between mt-5 gap-4">
                <BookmarkButton
                  animeId={mal_id}
                  imageUrl={poster}
                  title={title}
                  name={name}
                  status={info.status}
                  type={type}
                  score={`${info.score}`}
                  episodes={episodes}
                  chapters={chapters}
                />

                {/* STATS: Dibuat wrap dan justify center di mobile */}
                <div className="gap-2 flex flex-wrap justify-center">
                  <p className="text-yellow-300 border-r flex items-center gap-1 pr-2 text-sm md:text-base">
                    <Star className="size-4" />
                    {info.score || "N/A"}
                  </p>
                  <p className="text-pink-500 border-r flex items-center gap-1 pr-2 text-sm md:text-base">
                    <Heart className="size-4" />
                    {info.favorites || "N/A"}
                  </p>
                  <p className="text-yellow-500 border-r flex items-center gap-1 pr-2 text-sm md:text-base">
                    <Trophy className="size-4" />
                    {info.rank || "N/A"}
                  </p>
                  <p className="text-primary flex items-center gap-1 pr-2 text-sm md:text-base">
                    <UserRound className="size-4" />
                    {info.members || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Heading;
