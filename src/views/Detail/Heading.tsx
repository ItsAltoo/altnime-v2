import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Aired, MalUrl } from "@/types";
import { ArrowLeft, Book, Home } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface HeadingProps {
  title: string;
  poster: string;
  background: string;
  genres: MalUrl[];
  episodes: number | string;
  type: string;
  aired: Aired;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  poster,
  background,
  genres,
  episodes,
  type,
  aired = { prop: { from: { year: 0 }, to: { year: 0 } } },
}) => {
  const router = useRouter();
  return (
    <>
      <Image
        src={background}
        alt={title}
        width={100}
        height={100}
        className="absolute inset-0 object-cover w-full h-72 -z-10 blur-sm brightness-38"
      />

      <div className="">
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

        <div className="flex gap-8 ">
          <Image
            src={poster}
            alt={title}
            width={100}
            height={100}
            className="w-52 rounded-lg"
            sizes="(max-width: 640px) 100px, (max-width: 768px) 150px, 200px"
          />

          <div className="flex flex-col justify-between w-full">
            <h1 className="text-5xl font-bold">{title}</h1>

            <div className="flex flex-col gap-1">
              <p className="tracking-wide text-md">
                {aired.prop.from.year} -{" "}
                {aired.prop.to.year === aired.prop.from.year
                  ? "Ongoing"
                  : aired.prop.to.year}
              </p>
              <p className="tracking-wide text-md">Episodes: {episodes}</p>
              <p className="tracking-wide text-md">Type: {type}</p>

              {/* Genre Badges */}
              <div className="flex gap-2">
                {genres.map((genre) => (
                  <Badge
                    variant={"outline"}
                    key={genre.mal_id}
                    className="px-5 py-1 text-md font-bold tracking-wide"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>

              <Button className="w-fit mt-5 cursor-pointer">
                <Book />
                Bookmark
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Heading;
