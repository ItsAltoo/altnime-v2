"use client";
import GenresView from "@/views/Genres/GenresView";
import { useParams } from "next/navigation";
import React, { Suspense } from "react";

const page = () => {
  const { id } = useParams();

  return (
    <section className="p-4">
      <Suspense>
        <GenresView id={Number(id)} />
      </Suspense>
    </section>
  );
};

export default page;
