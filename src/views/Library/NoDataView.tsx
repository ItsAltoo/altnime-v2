import Image from "next/image";
import React from "react";

const NoDataView = () => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center text-2xl">
      <Image
        src="/mascot/Ryo.png"
        alt="Ryo"
        className="absolute left-1/5 w-72 object-cover -z-10 brightness-65 opacity-80"
        width={500}
        height={500}
      />
      <h1>No Data Available</h1>
      <p>Please add some anime to your library.</p>
    </div>
  );
};

export default NoDataView;
