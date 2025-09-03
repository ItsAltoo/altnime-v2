"use client";

import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { useHandleSearch } from "@/lib/hooks/useAnimeSearch";
import { Button } from "./ui/button";

const SearchBar = ({...onClick}) => {
  const { handleSearch, query, setQuery } = useHandleSearch();

  return (
    <>
      <form action="search" onSubmit={handleSearch}>
        <Button
          variant="ghost"
          className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
          {...onClick}
        >
          <Search
            className=" text-gray-400 hover:text-secondary "
            size={18}
            type="submit"
          />
        </Button>

        <Input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </form>
    </>
  );
};

export default SearchBar;
