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
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { AnimeCardProps } from "@/types";

export function AnimeCard({
  mal_id,
  title,
  imageUrl,
  score,
  episodes,
  chapters,
  type,
  status,
  name,
  category,
}: AnimeCardProps) {
  return (
    <Card className="w-full max-w-sm h-full shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <CardHeader className="px-3 pt-3 flex items-center justify-center">
        <div className="w-full aspect-[2/3] relative">
          <Link
            href={`/${category || "anime"}/${mal_id}`}
            rel="noopener noreferrer"
          >
            <Image
              src={imageUrl ? imageUrl : ""}
              alt={title ? title : `${name}`}
              className="rounded-t-md object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              fill
              priority={true}
              unoptimized={true}
            />
          </Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 flex-1 px-4">
        <CardTitle className="text-base md:text-lg font-bold break-words line-clamp-2">
          {title ? title : name}
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          {episodes && episodes > 0 && (
            <Badge variant="outline">Eps: {episodes}</Badge>
          )}

          {chapters && chapters > 0 && (
            <Badge variant="outline">Chapter: {chapters}</Badge>
          )}

          {score && score > 0 && (
            <Badge>
              <Star className="inline-block w-3 h-3 mr-1" /> {score}
            </Badge>
          )}

          {type && <Badge variant="secondary">Type: {type}</Badge>}

          {status && <Badge variant="outline">{status}</Badge>}
        </div>
      </CardContent>

      <CardFooter className="px-4 pb-4">
        <Button asChild className="w-full">
          <Link
            href={`/${category || "anime"}/${mal_id}`}
            rel="noopener noreferrer"
          >
            More Details
            <ArrowRight className="ml-1 size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
