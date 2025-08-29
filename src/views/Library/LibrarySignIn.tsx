import Image from "next/image";
import Link from "next/link";
import React from "react";

const LibrarySignIn = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-xl relative">
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
        className="absolute bottom-0 right-10 brightness-75"
      />
    </div>
  );
};

export default LibrarySignIn;
