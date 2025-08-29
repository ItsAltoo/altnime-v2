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
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";

const AuthIcon = ({ className }: { className?: string }) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {session ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={session.user?.image || "/default_profile.jpeg"}
                alt={session.user?.name || " "}
                width={50}
                height={50}
                className="rounded-full border md:max-w-10 max-w-9 cursor-pointer"
                priority
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="-left-4 top-0 relative ">
              <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Button
                  variant={"ghost"}
                  className="w-full flex justify-between cursor-pointer text-destructive"
                  onClick={() => signOut()}
                >
                  Sign Out
                  <LogOutIcon className="text-inherit" />
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <Button variant={"link"}>
          <Link href="/login" className="text-foreground">
            Sign In
          </Link>
        </Button>
      )}
    </div>
  );
};

export default AuthIcon;
