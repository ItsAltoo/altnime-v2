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
    <Card className="w-full max-w-sm h-[500px] shadow-md hover:shadow-xl transition-all duration-300 mb-8 justify-between">
      <CardHeader className="px-3 flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={title}
          className="rounded-t-md "
          width={150}
          height={150}
        />
      </CardHeader>
      <CardContent className="space-y-2">
        <CardTitle className="text-lg font-bold break-words line-clamp-2">{title}</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Type: {type}</Badge>
          <Badge variant="outline">Eps: {episodes}</Badge>
          <Badge>Score: <Star className="inline-block " /> {score ?? "N/A"}</Badge>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 ">
        <Button asChild className="w-full">
          <a href={url} target="_blank" rel="noopener noreferrer">
            Detail Anime
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
