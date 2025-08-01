"use client";
import { AnimeCard } from "@/components/Card";
import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import { PaginationComponent } from "@/components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface Anime {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string } };
  score: number;
  episodes: number;
  type: string;
  url: string;
  genres: { mal_id: number }[];
}

interface AnimeListProps {
  year: string;
  season: string;
}

export const AnimeList: React.FC<AnimeListProps> = ({ year, season }) => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(pageParam);

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      setError("");
      let limit = 25;
      let uniqueMap = new Map<number, Anime>();

      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/seasons/${year}/${season}?limit=${limit}&page=${page}`
        );
        const data = await res.json();

        if (!data || !data.data) {
          setError("Gagal memuat data anime.");
          return;
        }

        data.data.forEach((anime: Anime) => {
          const excludedGenres = [12, 49]; // mal_id genres

          const hasExcludedGenre = anime.genres?.some((genre) =>
            excludedGenres.includes(genre.mal_id)
          );

          if (!hasExcludedGenre) {
            uniqueMap.set(anime.mal_id, anime); // Filter duplikat
          }
        });

        const uniqueAnimes = Array.from(uniqueMap.values()).slice(0, 24);
        setAnimes(uniqueAnimes);
        setTotalPages(data.pagination.last_visible_page);
      } catch (err) {
        setError("Gagal memuat data anime.");
      } finally {
        setLoading(false);
      }
    };
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));

    fetchAnime();
    router.push(`?${params.toString()}`);
  }, [year, season, page]);

  if (loading)
    return (
      <p>
        Loading anime {season} {year}...
      </p>
    );

  if (error) return <p>{error}</p>;

  return (
    <>
      <Grid>
        {animes.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            title={anime.title}
            imageUrl={anime.images.jpg.image_url}
            score={anime.score}
            episodes={anime.episodes}
            type={anime.type}
            url={anime.url}
          />
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
