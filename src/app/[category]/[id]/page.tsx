"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { jikan } from "@/services/api";

const page = () => {
  const params = useParams();
  const { category, id } = params;

  useEffect(() => {
    jikan
      .get(`/${category}/${id}`)
      .then((res) => {
        const data = res.data;
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [category, id]);

  return (
    <>
      <div>category : {category}</div>
      <div>id : {id}</div>
    </>
  );
};

export default page;
