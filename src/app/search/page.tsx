import React from "react";
import { AnimeList } from "@/views/Search/SearchView";

const SearchResultsPage = () => {
  return (
    <section className="p-4">
      <AnimeList limit={24}/>
    </section>
  );
};

export default SearchResultsPage;
