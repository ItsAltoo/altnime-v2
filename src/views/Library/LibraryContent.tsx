"use client";
import { AnimeCard } from "@/components/Card/Card";
import { jikan } from "@/services/api";
import { Anime, CardLibraryType } from "@/types";
import axios from "axios";
import React, { useEffect } from "react";
import Grid from "../Seasons/Grid";
import Loading from "../Seasons/layout/AnimeListLoad";

interface LibraryType {
  cards: CardLibraryType[];
}

const LibraryContent = () => {
  const [libraryData, setLibraryData] = React.useState<LibraryType[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/library")
      .then((response) => {
        setLibraryData(response.data);
        console.log("Library data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching library data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Grid>
      {libraryData.map((library) =>
        library.cards.map((card) => (
          <AnimeCard
            key={card.id}
            mal_id={card.animeId}
            title={card.title}
            name={card.name}
            imageUrl={card.imageUrl}
            episodes={card.episodes}
            score={card.score}
            chapters={card.chapters}
            status={card.status}
            type={card.type}
          />
        ))
      )}
    </Grid>
  );
};

export default LibraryContent;
