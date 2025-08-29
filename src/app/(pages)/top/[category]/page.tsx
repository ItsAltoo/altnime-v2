import { AnimeList } from "@/views/TopCategory/TopCategoryView";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <>
      <section className="p-4">
        <Suspense>
          <AnimeList limit={24} />
        </Suspense>
      </section>
    </>
  );
}
