import Image from "next/image";
import Link from "next/link";
import React from "react";

const LibrarySignIn = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-xl relative text-center">
      <h1>Sign In to Your Library</h1>
      <p>
        Please sign in to access your library.{" "}
        <Link href="/login" className="underline">
          Sign In Here
        </Link>
      </p>
      <Image
        src={"/mascot/Kita.png"}
        alt="Kita"
        width={400}
        height={400}
        className="absolute bottom-0 md:right-10 brightness-75"
        priority={true}
        unoptimized={true}
      />
    </div>
  );
};

export default LibrarySignIn;
