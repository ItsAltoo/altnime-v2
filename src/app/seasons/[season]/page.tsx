import { SeasonsView } from "@/views/Seasons/SeasonsView";
import React, { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ season: string }> }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 13 }, (_, i) => currentYear + 2 - i);
  const { season } = await params;

  return (
    <Suspense>
      <SeasonsView years={years} season={season} currentYear={currentYear} />
    </Suspense>
  );
};

export default page;
