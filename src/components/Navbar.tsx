"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icon } from "@iconify/react";
import { clsx } from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/seasons/winter", label: "Winter" },
  { href: "/seasons/spring", label: "Spring" },
  { href: "/seasons/summer", label: "Summer" },
  { href: "/seasons/fall", label: "Fall" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <header className="sticky inset-x-0 top-0 z-50 h-14 border-b bg-black/60 backdrop-blur-md">
      <nav className="flex h-full items-center justify-between px-4 sm:px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-br from-primary via-[#0065F8] to-[#00CAFF] text-transparent bg-clip-text  animate-pulse">
            AltNime
          </h1>
        </Link>

        {/* ------- Desktop Menu ------- */}
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Button variant="link">
                <Link href={l.href} className="text-foreground">
                  {l.label}
                </Link>
              </Button>
            </li>
          ))}
        </ul>

        {/* ------- Mobile Menu ------- */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" aria-label="Open menu">
                <Icon
                  icon="ic:round-menu"
                  width={50}
                  className="hover:text-primary active:text-primary"
                />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="top"
              className="w-full bg-black/60 backdrop-blur-2xl"
            >
              {/* Logo di panel */}
              <SheetTitle>
                <div className="flex items-center justify-center">
                  <Link href="/" className="flex items-center">
                    <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-br from-primary via-[#0065F8] to-[#00CAFF] text-transparent bg-clip-text  animate-pulse">
                      AltNime
                    </h1>
                  </Link>
                </div>
              </SheetTitle>

              {/* Link list */}
              <SheetHeader>
                <ul className="flex flex-col gap-3">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={handleClose}
                        className={clsx(
                          "block rounded-md px-3 py-2 text-base font-medium ",
                          "hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
