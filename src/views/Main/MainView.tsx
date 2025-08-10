import React from "react";
import { Hero } from "./Hero";
import { AnimeCarousel } from "@/components/CardCarousel";

const MainView = () => {
  return (
    <>
      {/* Hero */}
      <section className="h-screen">
        <Hero />
      </section>

      <section className="">
        {/* Top Anime */}
        <AnimeCarousel title="Top Airing Anime" filter="airing" />
        <AnimeCarousel title="Upcoming Anime" filter="upcoming" />
        <AnimeCarousel title="Popular Anime" filter="bypopularity" />
        <AnimeCarousel title="Favorite Anime" filter="favorite" />
        <AnimeCarousel title="Top Anime Overall" />
      </section>
    </>
  );
};

export default MainView;
