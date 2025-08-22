import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen text-4xl font-bold relative">
        <h1>Coming Soon</h1>
        <Image src="/mascot/Ryo.png" alt="Coming Soon" width={900} height={900} className="absolute md:w-72 w-52 md:left-1/4 -left-10 -z-10" />
      </div>
    </>
  );
};

export default page;
