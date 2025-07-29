"use client";
import { AnimeCard } from "@/components/Card";
import React, { useEffect, useState } from "react";
import Grid from "./Grid";

interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  score: number;
  episodes: number;
  type: string;
  url: string;
}

interface AnimeListProps {
  year: string;
  season: string;
}

export const AnimeList: React.FC<AnimeListProps> = ({ year, season }) => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/seasons/${year}/${season}`
        );
        const data = await res.json();
        setAnimes(data.data); // Jikan v4 menyimpan data di dalam "data"
      } catch (err) {
        setError("Gagal memuat data anime.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [year, season]);

  if (loading)
    return (
      <p>
        Loading anime {season} {year}...
      </p>
    );
  if (error) return <p>{error}</p>;

  const uniqueAnimes = animes.filter(
    (anime, index, self) =>
      index === self.findIndex((a) => a.mal_id === anime.mal_id)
  );

  return (
    <>
      <Grid>
        {uniqueAnimes.map((anime) => (
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
    </>
  );
};
