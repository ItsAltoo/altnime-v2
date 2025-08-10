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
  copyright = "© 2025 AltNime. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: FooterProps) => {
  return (
    <section className="flex items-center justify-center pt-20">
      <div className="container px-4">
        {/* 1. Menambahkan perataan tengah untuk mobile (`items-center`, `text-center`).
         Ini akan ditimpa oleh class `lg:` di layar besar.
    */}
        <div className="flex w-full flex-col items-center justify-between gap-10 text-center lg:flex-row lg:items-start lg:text-left">
          {/* Kolom Kiri: Logo, Deskripsi, Sosial Media */}
          <div className="flex w-full flex-col items-center justify-between gap-6 lg:w-auto lg:items-start">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 lg:justify-start">
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

            {/* 2. Mengubah `max-w-[30%]` agar tidak merusak layout mobile.
             Sekarang lebar maksimumnya adalah `max-w-xs` (extra small) di mobile,
             dan kembali ke `lg:max-w-[30%]` di layar besar.
        */}
            <p className="text-muted-foreground max-w-xs text-sm lg:max-w-[30%]">
              {description}
            </p>

            <ul className="text-muted-foreground flex items-center space-x-6">
              {socialLinks.map((social, idx) => (
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

          {/* Anda bisa menambahkan kolom link footer di sini jika perlu */}
          {/* <div className="... (kolom kanan)"></div> */}
        </div>

        {/* 3. Menambahkan `items-center` dan `text-center` untuk mobile pada bagian copyright.
         */}
        <div className="text-muted-foreground mt-8 flex flex-col items-center justify-between gap-4 border-t py-8 text-center text-xs font-medium md:flex-row md:text-left">
          <p className="order-2 md:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row md:gap-4">
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
