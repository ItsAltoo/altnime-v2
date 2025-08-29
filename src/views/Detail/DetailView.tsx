import { useDetailAnime } from "@/hooks/useDetailAnime";
import React from "react";
import Heading from "./Heading";
import { HeadingSkeleton } from "./HeadingLoad";
import Content from "./Content";

const DetailView = () => {
  const { data, loading, error } = useDetailAnime();

  if (loading)
    return (
      <div className="md:p-12 px-5">
        <HeadingSkeleton />
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!data) return <div>No detail data available.</div>;

  return (
    <>
      <section className="md:p-12 px-6 ">
        <Heading
          mal_id={data.mal_id}
          title={data.title}
          name={data.name}
          chapters={data.chapters}
          poster={data.images.jpg.image_url}
          background={data.images.jpg.large_image_url}
          genres={data.genres}
          episodes={data.episodes}
          type={data.type}
          aired={data.aired}
          published={data.published}
          info={{
            status: data.status,
            members: data.members,
            score: data.score,
            rank: data.rank,
            favorites: data.favorites,
          }}
        />

        <Content
          synopsis={data.synopsis}
          background={data.background}
          info={{
            studios: data.studios?.map((studio) => studio.name),
            producers: data.producers?.map((producer) => producer.name),
            season: data.season,
            duration: data.duration,
            source: data.source,
            titles: data.titles?.map((title) => title.title),
            about: data.about,
          }}
          trailer={{
            url: data.trailer?.embed_url,
            images: {
              image_url: data.trailer?.images?.large_image_url,
            },
          }}
        />
      </section>
    </>
  );
};

export default DetailView;
