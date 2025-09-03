import { CardLibraryType } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react'

interface LibraryType {
  cards: CardLibraryType[];
}

export const useLibrary = () => {
  const [libraryData, setLibraryData] = useState<LibraryType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setIsLoading(true);
        axios
        .get("/api/library")
        .then((response) => {
          setLibraryData(response.data);
          console.log("Library data:", response.data);
          })
          .catch((error) => {
            console.error("Error fetching library data:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
    }, []);
  return { libraryData, isLoading };
}
