"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";

const AuthIcon = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={session.user?.image || "/default_profile.jpeg"}
                alt={session.user?.email || " "}
                width={50}
                height={50}
                className="rounded-full border h-10 w-10 cursor-pointer"
                priority
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="-left-4 top-0 relative ">
              <DropdownMenuItem asChild>
                <Button
                  variant={"ghost"}
                  className="w-full flex justify-between cursor-pointer"
                  onClick={() => signOut()}
                >
                  Sign Out
                  <LogOutIcon />
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
