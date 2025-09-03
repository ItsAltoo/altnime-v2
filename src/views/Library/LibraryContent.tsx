"use client";
import { AnimeCard } from "@/components/Card/Card";
import Grid from "../Seasons/Grid";
import Loading from "../Seasons/layout/AnimeListLoad";
import NoDataView from "./NoDataView";
import { useLibrary } from "@/lib/hooks/useLibrary";

const LibraryContent = () => {
  const { isLoading, libraryData } = useLibrary();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {libraryData[0]?.cards.length > 0 ? (
        <>
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
        </>
      ) : (
        <NoDataView />
      )}
    </>
  );
};

export default LibraryContent;
