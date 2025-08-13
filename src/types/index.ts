export interface Anime {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string; large_image_url: string } };
  score: number;
  episodes: number;
  type: string;
  url: string;
  genres: { mal_id: number }[];
  synopsis: string;
  background: string;
}

export interface AnimeCarouselProps {
  title: string;
  filter?: string;
  limit?: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface AnimeCardProps {
  mal_id: number;
  title: string;
  imageUrl: string;
  score: number;
  episodes: number;
  type: string;
}

export interface FooterProps {
  logo: {
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
