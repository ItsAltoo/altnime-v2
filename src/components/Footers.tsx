import React from "react";
import { FaInstagram, FaGlobe, FaGithub } from "react-icons/fa";

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSocialLinks = [
  {
    icon: <FaInstagram className="size-5" />,
    href: "https://www.instagram.com/malik_qit/",
    label: "Instagram",
  },
  {
    icon: <FaGithub className="size-5" />,
    href: "https://github.com/ItsAltoo",
    label: "Github",
  },
  {
    icon: <FaGlobe className="size-5" />,
    href: "https://www.itsmalik.tech",
    label: "Website",
  },
];

const defaultLegalLinks = [
  { name: "Terms of Use", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

const Footer = ({
  logo = {
    url: "https://www.itsmalik.tech",
    src: "Monica.jpeg",
    alt: "logo",
    title: "ItsAlto",
  },
  // ** PERUBAHAN: Menambahkan atribusi dan pernyataan tidak resmi **
  description = "Anime and manga data is provided by MyAnimeList via the Jikan API. This project is not affiliated with MyAnimeList.net.",
  socialLinks = defaultSocialLinks,
  // ** PERUBAHAN: Memperbarui tahun copyright **
  copyright = "© 2025 ItsAlto. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: FooterProps) => {
  return (
    <section className="items-center justify-center flex pt-20">
      <div className="container">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={logo.url}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-12 w-12 rounded-full object-cover"
                />
              </a>
              <h2 className="text-xl font-semibold">{logo.title}</h2>
            </div>
            <p className="text-muted-foreground max-w-[30%] text-sm">
              {description}
            </p>
            <ul className="text-muted-foreground flex items-center space-x-6">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="hover:text-primary font-medium">
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
        <div className="text-muted-foreground mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
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
