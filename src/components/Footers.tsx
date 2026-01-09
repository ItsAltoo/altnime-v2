import { FooterProps } from "@/types";
import Image from "next/image";
import React from "react";

const defaultSocialLinks = [];

const defaultLegalLinks = [
  { name: "Terms of Use", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

const items: FooterProps = {
  logo: {
    url: "#",
    src: "/Monica.jpeg",
    alt: "logo",
    title: "ItsAlto",
  },
  description:
    "Anime and manga data is provided by MyAnimeList via the Jikan API. This project is not affiliated with MyAnimeList.net.",
  // socialLinks: defaultSocialLinks,
  copyright: "© 2026 AltNime. All rights reserved.",
  legalLinks: defaultLegalLinks,
};

const Footer = () => {
  return (
    <section className="flex items-center justify-center pt-20">
      <div className="container px-4">
        <div className="flex w-full flex-col items-center justify-between gap-10 text-center lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col items-center justify-between gap-6 lg:w-auto lg:items-start">
            <div className="flex items-center justify-center gap-2 lg:justify-start">
              <Image
                src={items.logo.src}
                alt={items.logo.alt}
                title={items.logo.title}
                className="w-12 h-12 rounded-full object-cover"
                height={52}
                width={52}
                priority={false}
                unoptimized={true}
              />
              <h2 className="text-xl font-semibold">{items.logo.title}</h2>
            </div>

            <p className="text-muted-foreground max-w-xs text-sm lg:max-w-lg">
              {items.description}
            </p>

            <ul className="text-muted-foreground flex items-center space-x-6">
              {items.socialLinks?.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary">
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-muted-foreground mt-8 flex flex-col items-center justify-between gap-4 border-t py-8 text-center text-xs font-medium md:flex-row md:text-left">
          <p className="order-2 md:order-1">{items.copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row md:gap-4">
            {items.legalLinks?.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Footer };
