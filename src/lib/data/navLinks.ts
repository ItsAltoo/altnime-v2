// lib/config/navLinks.ts
export interface NavItem {
  href?: string;
  label: string;
  items?: {
    href: string;
    label: string;
  }[];
}

// Function untuk generate nav links dengan selectedYear
export const getNavLinks = (selectedYear: string | number): NavItem[] => [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Library",
    href: '/library',
  },
  {
    label: "Seasons",
    items: [
      {
        label: "Winter",
        href: `/seasons/winter?year=${selectedYear}&page=1`,
      },
      {
        label: "Spring",
        href: `/seasons/spring?year=${selectedYear}&page=1`,
      },
      {
        label: "Summer",
        href: `/seasons/summer?year=${selectedYear}&page=1`,
      },
      {
        label: "Fall",
        href: `/seasons/fall?year=${selectedYear}&page=1`,
      },
    ],
  },
  {
    label: "Details",
    items: [
      {
        label: "Top Anime",
        href: `/top/anime?page=1`,
      },
      {
        label: "Top Characters",
        href: `/top/characters?page=1`,
      },
      {
        label: "Top Manga",
        href: `/top/manga?page=1`,
      },
      {
        label: "Genres",
        href: `/genres/1`,
      }
    ],
  },
];
