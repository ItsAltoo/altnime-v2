import React from "react";
import { Hero } from "./Hero";
import { AnimeCarousel } from "@/components/Card/CardCarousel";

const MainView = () => {
  return (
    <>
      {/* Hero */}
      <section className="h-screen">
        <Hero />
      </section>

      <section className="mt-20">
        {/* Top Anime */}
        <AnimeCarousel title="Top Anime Overall" />
        <AnimeCarousel title="Top Airing Anime" filter="airing" />
        <AnimeCarousel title="Upcoming Anime" filter="upcoming" />
        <AnimeCarousel title="Popular Anime" filter="bypopularity" />
        <AnimeCarousel title="Favorite Anime" filter="favorite" />
      </section>
    </>
  );
};

export default MainView;
