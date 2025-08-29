import React, { Suspense } from "react";
import { AnimeList } from "@/views/Search/SearchView";

const SearchResultsPage = () => {
  return (
    <section className="p-4">
      <Suspense>
        <AnimeList limit={24} />
      </Suspense>
    </section>
  );
};

export default SearchResultsPage;
