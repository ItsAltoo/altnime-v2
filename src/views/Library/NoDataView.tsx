import Image from "next/image";
import React from "react";

const NoDataView = () => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center text-2xl text-center">
      <Image
        src="/mascot/Ryo.png"
        alt="Ryo"
        className="absolute md:left-1/6 md:bottom-1/3 bottom-1/2 w-72 object-cover -z-10 brightness-60 opacity-80"
        width={500}
        height={500}
        priority={true}
        unoptimized={true}
      />
      <h1>No Data Available</h1>
      <p>Please add some anime to your library.</p>
    </div>
  );
};

export default NoDataView;
