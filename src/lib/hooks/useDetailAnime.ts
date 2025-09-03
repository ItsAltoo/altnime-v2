import { jikan } from "@/services/api";
import { Aired, AnimeDetail } from "@/types";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface UseDetailAnime extends AnimeDetail {
  about: string;
  chapters: number;
  published: Aired;
  name: string;
}

export const useDetailAnime = () => {
  const params = useParams();
  const [data, setData] = useState<UseDetailAnime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { category, id } = params;

  useEffect(() => {
    jikan
      .get(`/${category}/${id}`)
      .then((res) => {
        const detail = res.data.data;
        setData(detail);
        setLoading(false);
      })
      .catch((err) => {
        if (err.status === 404) {
          redirect("/404");
        }
        setError(err.message);
        setLoading(false);
      });
  }, [id, category]);

  return { data, loading, error };
};
