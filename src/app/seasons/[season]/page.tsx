import { SeasonsView } from "@/views/Seasons/SeasonsView";
import React, { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ season: string }> }) => {
  const { season } = await params;

  return (
    <Suspense>
      <SeasonsView season={season} />
    </Suspense>
  );
};

export default page;
