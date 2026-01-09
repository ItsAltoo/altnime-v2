"use client";
import { AnimeList } from "@/views/Seasons/layout/AnimeList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useYearStore } from "@/lib/stores/useYearStore";
import { ScrollArea } from "@/components/ui/scroll-area";

export const SeasonsView = ({ season }: { season: string }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 13 }, (_, i) => currentYear + 2 - i);

  const searchParams = useSearchParams();
  const storeYear = useYearStore((state) => state.selectedYear);
  const setYearGlobal = useYearStore((state) => state.setYear);

  const [selectedYear, setSelectedYear] = useState(storeYear || currentYear);

  useEffect(() => {
    const yearFromUrl = searchParams.get("year");
    if (yearFromUrl) {
      const yearNum = parseInt(yearFromUrl);
      setSelectedYear(yearNum);
      setYearGlobal(yearNum);
    }
  }, [searchParams, setYearGlobal]);

  const handleChangeYear = (year: number) => {
    setSelectedYear(year);
    setYearGlobal(year);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center gap-4 mb-4">
        <h1 className="md:text-2xl text-xl font-bold capitalize">
          Anime Season {season}
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="cursor-pointer text-xl">{selectedYear}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <ScrollArea className="h-40 w-full">
              <div className="grid md:grid-cols-3 gap-2 grid-cols-1">
                {years.map((year) => (
                  <DropdownMenuItem
                    key={year}
                    onClick={() => handleChangeYear(year)}
                    className="cursor-pointer"
                  >
                    {year}
                  </DropdownMenuItem>
                ))}
              </div>
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AnimeList year={selectedYear} season={season} />
    </div>
  );
};
