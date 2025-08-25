"use client"
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const AuthIcon = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <Image
            src={session.user?.image || " "}
            alt={session.user?.name || " "}
            width={50}
            height={50}
            className="rounded-full border h-10 w-10 cursor-pointer"
          />
        </>
      ) : (
        <Button variant={"link"}>
          <Link href="/login" className="text-foreground">
            Login
          </Link>
        </Button>
      )}
    </>
  );
};

export default AuthIcon;
