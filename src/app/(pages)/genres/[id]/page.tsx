"use client";
import GenresView from "@/views/Genres/GenresView";
import React, { Suspense } from "react";

const page = async ({params}: {params: Promise<{id: number}>}) => {
  const { id } = await params;

  return (
    <section className="p-4">
      <Suspense>
        <GenresView id={Number(id)} />
      </Suspense>
    </section>
  );
};

export default page;
