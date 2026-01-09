import React, { Suspense } from "react";
import Grid from "../Seasons/Grid";
import { AnimeCard } from "@/components/Card/Card";
import { PaginationComponent } from "@/components/Pagination";
import Loading from "../Seasons/layout/AnimeListLoad";
import { useGenres } from "@/lib/hooks/useGenres";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Scroll } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const GenresView = ({ id }: { id: number }) => {
  const router = useRouter();
  const {
    results,
    loading,
    error,
    page,
    totalPages,
    setPage,
    genres,
    selectedGenre,
  } = useGenres({
    id,
    limit: 24,
  });

  const handleChangeGenre = (genreId: number) => {
    router.push(`/genres/${genreId}`);
  };

  if (loading) return <Loading />;
  else if (error || results.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl">{error} Try Again.</p>
      </div>
    );

  return (
    <>
      <div className="flex items-center justify-center gap-4 mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-2xl  cursor-pointer">
              {selectedGenre}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <ScrollArea className="h-60 w-full">
              <div className="grid md:grid-cols-3 grid-cols-1 gap-2 p-2">
                {genres.map((genre) => (
                  <DropdownMenuItem
                    key={genre.mal_id}
                    onClick={() => handleChangeGenre(genre.mal_id)}
                    className="cursor-pointer"
                  >
                    {genre.name}
                  </DropdownMenuItem>
                ))}
              </div>
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Grid>
        {results.map((anime) => (
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

export default GenresView;
