import { AnimeList } from "@/views/Seasons/AnimeList";
import React from "react";

interface SeasonPageProps {
  params: { season: string };
} 

const page: React.FC<SeasonPageProps> = ({ params }) => {
  const currentYear = new Date().getFullYear();
  const seasons = params.season;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold capitalize mb-4 text-center">
        Anime Musim {seasons} {currentYear}
      </h1>
      <AnimeList year={`${currentYear}`} season={seasons} />
    </div>
  );
};

export default page;
