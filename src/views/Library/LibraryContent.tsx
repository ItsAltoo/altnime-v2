"use client";
import { Anime } from "@/types";
import axios from "axios";
import React, { useEffect } from "react";

const LibraryContent = () => {
  const [libraryData, setLibraryData] = React.useState<Anime[]>([]);

  useEffect(() => {
    axios
      .get("/api/library")
      .then((response) => {
        setLibraryData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching library data:", error);
      });
  }, []);

  return (
    <div>
      {libraryData.map((item) => (
        <p key={item.mal_id}>{item.mal_id}</p>
      ))}
    </div>
  );
};

export default LibraryContent;
