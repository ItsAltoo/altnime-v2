"use client";
import React, { Suspense, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Icon } from "@iconify/react";
import { clsx } from "clsx";
import { useYearStore } from "@/lib/stores/useYearStore";
import { getNavLinks } from "@/lib/data/navLinks";
import SearchBar from "./SearchBar";
import { PageLoad } from "./PageLoad";
import AuthIcon from "./auth/AuthIcon";
import { MenuIcon } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const selectedYear = useYearStore((state) => state.selectedYear);

  const navLinks = getNavLinks(selectedYear);

  return (
    <>
      <header className="sticky inset-x-0 top-0 z-50 h-14 border-b bg-black/60 backdrop-blur-md">
        <nav className="flex h-full items-center justify-between px-3">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="md:text-2xl text-xl font-bold tracking-wide bg-gradient-to-br from-primary via-[#0065F8] to-[#00CAFF] text-transparent bg-clip-text">
              AltNime{""}
              <span className="rotate-5 inline-block bg-gradient-to-br from-primary via-[#8cff00] to-[#6EC207] text-transparent bg-clip-text animate-pulse">
                &#123;List&#125;
              </span>
            </h1>
          </Link>

          {/* ------- Desktop Menu ------- */}
          <div className="flex gap-3">
            <ul className="hidden items-center gap-3 md:flex">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    // Simple link (like Home)
                    <Button variant="link">
                      <Link href={link.href} className="text-foreground">
                        {link.label}
                      </Link>
                    </Button>
                  ) : (
                    // Dropdown menu (like Seasons, Movies)
                    <NavigationMenu>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent">
                          {link.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="flex flex-col max-w-full">
                            {link.items?.map((item) => (
                              <li key={item.href}>
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start"
                                >
                                  <Link
                                    href={item.href}
                                    className="w-full text-foreground"
                                  >
                                    {item.label}
                                  </Link>
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenu>
                  )}
                </li>
              ))}
            </ul>

            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 w-full max-w-sm">
              <div className="relative flex-1">
                <SearchBar />
              </div>
            </div>

            <AuthIcon className="hidden md:block" />
          </div>

          {/* ------- Mobile Menu ------- */}
          <div className="md:hidden flex justify-center items-center gap-2">
            <AuthIcon className="md:hidden" />

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <MenuIcon className="hover:text-primary active:text-primary size-7" />
              </SheetTrigger>

              <SheetContent
                side="top"
                className="w-full bg-black/60 backdrop-blur-2xl"
                aria-describedby={undefined}
              >
                <SheetTitle>
                  <div className="flex items-center justify-center">
                    <div className="md:hidden flex items-center w-full max-w-sm">
                      <div className="relative flex-1 mt-12 mx-7">
                        <SearchBar onClick={() => setOpen(false)} />
                      </div>
                    </div>
                  </div>
                </SheetTitle>

                <SheetHeader>
                  <ul className="flex flex-col gap-3">
                    {navLinks.map((link) => (
                      <li key={link.label}>
                        {link.href ? (
                          <Link
                            href={link.href}
                            onClick={() => {
                              setOpen(false);
                            }}
                            className={clsx(
                              "block rounded-md px-3 py-2 text-base font-medium ",
                              "hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <Collapsible>
                            <CollapsibleTrigger className="w-full flex justify-between items-center rounded-md px-3 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground">
                              {link.label}
                              <Icon icon="mdi:chevron-down" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <ul className="mt-2 flex flex-col gap-2 pl-4">
                                {link.items?.map((item) => (
                                  <li key={item.href}>
                                    <Link
                                      href={item.href}
                                      onClick={() => setOpen(false)}
                                      className={clsx(
                                        "block rounded-md px-3 py-2 text-sm font-medium ",
                                        "hover:bg-accent hover:text-accent-foreground"
                                      )}
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </CollapsibleContent>
                          </Collapsible>
                        )}
                      </li>
                    ))}
                  </ul>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
      <Suspense>
        <PageLoad />
      </Suspense>
    </>
  );
}

export default Navbar;
