import { jikan } from "@/services/api";
import { AnimeDetail } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useDetailAnime = () => {
  const params = useParams();
  const [data, setData] = useState<AnimeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { category, id } = params;

  useEffect(() => {
    jikan
      .get(`/${category}/${id}`)
      .then((res) => {
        const detail = res.data.data;
        setData(detail);
        console.log(detail);
        
        setLoading(false);
      })
      .catch((err) => {
        setError(`Failed to fetch anime details. ${err.message}`);
        setLoading(false);
      });
  }, [id]);

  return { data, loading, error };
};
