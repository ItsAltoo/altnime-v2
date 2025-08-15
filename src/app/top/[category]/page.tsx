import { AnimeList } from "@/views/TopCategory/TopCategoryView";
import React from "react";

export default function Page() {
  return (
    <>
      <section className="p-4">
        <AnimeList limit={24} />
      </section>
    </>
  );
}
