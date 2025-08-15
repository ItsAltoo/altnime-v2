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

export const SeasonsView = ({
  years,
  season,
  currentYear,
}: {
  years: number[];
  season: string;
  currentYear: number;
}) => {
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
  }, [searchParams]);

  const handleChangeYear = (year: number) => {
    setSelectedYear(year);
    setYearGlobal(year);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center gap-4 mb-4">
        <h1 className="text-2xl font-bold capitalize">Anime Musim {season}</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{selectedYear}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="h-40">
            {years.map((year) => (
              <DropdownMenuItem
                key={year}
                onClick={() => handleChangeYear(year)}
              >
                {year}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AnimeList year={selectedYear} season={season} />
    </div>
  );
};
