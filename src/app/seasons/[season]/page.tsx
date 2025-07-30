import { ClientPage } from "@/views/Seasons/SeasonsView";
import React from "react";

const page = async ({ params }: { params: Promise<{ season: string }> }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 13 }, (_, i) => currentYear + 2 - i);
  const { season } = await params;

  return (
    <ClientPage years={years} season={season} currentYear={currentYear} />
  );
};

export default page;

