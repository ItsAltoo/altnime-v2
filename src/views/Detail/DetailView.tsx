import { useDetailAnime } from "@/hooks/useDetailAnime";
import React from "react";
import Heading from "./Heading";

const DetailView = () => {
  const { data, loading, error } = useDetailAnime();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>No detail data available.</div>;

  return (
    <>
      <section className="p-12">
        <Heading
          title={data.title}
          poster={data.images.jpg.image_url}
          background={data.images.jpg.large_image_url}
          genres={data.genres}
          episodes={data.episodes || "N/A"}
          type={data.type}
          aired={data.aired}
        />
      </section>
    </>
  );
};

export default DetailView;
