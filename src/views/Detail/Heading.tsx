import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeadingDetailProps } from "@/types";
import {
  ArrowLeft,
  Book,
  Heart,
  Home,
  Star,
  Trophy,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Heading: React.FC<HeadingDetailProps> = ({
  title,
  poster,
  background,
  genres,
  episodes,
  type,
  aired = { prop: { from: { year: 0 }, to: { year: 0 } } },
  info,
}) => {
  const router = useRouter();

  return (
    <>
      {/* BACKGROUND IMAGE: Menggunakan 'fill' lebih baik untuk gambar latar */}
      <div className="absolute inset-0 h-60 md:h-72 -z-10">
        <Image
          src={background}
          alt={title}
          fill
          className="object-cover w-full h-full blur-sm brightness-50"
          priority
          quality={75}
        />
      </div>

      <div className="border-b pb-10 md:pb-20">
        {/* navigation */}
        <div className="mb-5 w-full h-14 flex items-center justify-between">
          <Button
            size="circle"
            className="cursor-pointer"
            onClick={() => router.back()}
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

        {/* LAYOUT UTAMA: Stacked di mobile, side-by-side di desktop */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
          {/* POSTER IMAGE: Ukuran disesuaikan untuk mobile dan desktop */}
          <Image
            src={poster}
            alt={title}
            width={300} // Lebar sumber untuk kualitas
            height={450} // Tinggi sumber untuk kualitas
            className="w-40 md:w-52 h-auto rounded-lg flex-shrink-0" // Ukuran tampilan diatur di sini
            sizes="(max-width: 768px) 40vw, 208px"
          />

          <div className="flex flex-col justify-between w-full">
            {/* JUDUL: Ukuran font responsif */}
            <h1 className="text-3xl md:text-5xl font-bold line-clamp-2 text-center md:text-left">
              {title}
            </h1>

            <div className="flex flex-col gap-3 mt-4">
              <div className="text-sm md:text-md flex flex-col items-center md:items-start gap-1">
                <p className="tracking-wide">
                  {aired.prop.from.year} - {aired.prop.to.year || "Ongoing"}
                </p>
                <p className="tracking-wide">Episodes: {episodes || "N/A"}</p>
                <p className="tracking-wide">Type: {type}</p>
                <Badge className="tracking-wide mt-1" variant={"outline"}>
                  {info.status}
                </Badge>
              </div>

              {/* Genre Badges: Dibuat wrap dan justify center di mobile */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {genres && genres.map((genre) => (
                  <Badge
                    variant={"outline"}
                    key={genre.mal_id}
                    className="px-3 py-1 text-xs md:text-sm font-bold tracking-wide"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>

              {/* AKSI & STATS: Stacked di mobile, side-by-side di desktop */}
              <div className="flex flex-col md:flex-row items-center md:items-end justify-between mt-5 gap-4">
                <Button className="w-fit cursor-pointer">
                  <Book className="mr-2" />
                  Bookmark
                </Button>

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
