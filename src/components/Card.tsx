import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";

type AnimeCardProps = {
  title: string;
  imageUrl: string;
  score: number;
  episodes: number;
  type: string;
  url: string;
};

export function AnimeCard({
  title,
  imageUrl,
  score,
  episodes,
  type,
  url,
}: AnimeCardProps) {
  return (
    <Card className="w-full max-w-sm h-full shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <CardHeader className="px-3 pt-3 flex items-center justify-center">
        <div className="w-full aspect-[2/3] relative">
          <Image
            src={imageUrl}
            alt={title}
            className="rounded-t-md object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-2 flex-1 px-4">
        <CardTitle className="text-base md:text-lg font-bold break-words line-clamp-2">
          {title}
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Type: {type}</Badge>
          <Badge variant="outline">Eps: {episodes}</Badge>
          <Badge>
            Score: <Star className="inline-block w-4 h-4 ml-1" />{" "}
            {score ?? "N/A"}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="px-4 pb-4">
        <Button asChild className="w-full">
          <Link href={url} target="_blank" rel="noopener noreferrer">
            Detail Anime
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
