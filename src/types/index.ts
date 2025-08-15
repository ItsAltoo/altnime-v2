interface ImageTypes {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

interface MalUrl {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Aired {
  from: string | null;
  to: string | null;
  prop: {
    from: { day: number | null; month: number | null; year: number | null };
    to: { day: number | null; month: number | null; year: number | null };
  };
  string: string;
}

export interface Anime {
  mal_id: number;
  title: string;
  images: { jpg: ImageTypes; webp?: ImageTypes };
  score: number;
  episodes: number;
  type: string;
  url?: string;
  genres?: { mal_id: number }[];
  synopsis?: string;
  background?: string;
}

export interface Manga {
  chapters?: number;
  volumes?: number;
  status?: string;
}

export interface AnimeDetail {
  mal_id: number;
  url: string;
  images: {
    jpg: ImageTypes;
    webp: ImageTypes;
  };

  // --- Informasi Judul ---
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[];

  // --- Informasi Dasar ---
  type: string | null;
  source: string | null;
  episodes: number | null;
  status: string; // e.g., "Finished Airing", "Currently Airing"
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string | null; // e.g., "PG-13 - Teens 13 or older"

  // --- Skor dan Popularitas ---
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number;
  members: number;
  favorites: number;

  // --- Sinopsis dan Latar Belakang ---
  synopsis: string | null;
  background: string | null;

  // --- Musim dan Penyiaran ---
  season: string | null;
  year: number | null;
  broadcast: {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
  };

  // --- Relasi (Studio, Genre, dll.) ---
  producers: MalUrl[];
  licensors: MalUrl[];
  studios: MalUrl[];
  genres: MalUrl[];
  explicit_genres: MalUrl[];
  themes: MalUrl[];
  demographics: MalUrl[];

  // --- Relasi dengan Anime Lain ---
  relations: {
    relation: string; // e.g., "Prequel", "Sequel", "Adaptation"
    entry: MalUrl[];
  }[];

  // --- Lagu Tema ---
  theme: {
    openings: string[];
    endings: string[];
  };

  // --- Link Eksternal ---
  external: {
    name: string;
    url: string;
  }[];

  streaming: {
    name: string;
    url: string;
  }[];
}

// Props
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
  mal_id?: number;
  title?: string;
  imageUrl?: string;
  score?: number;
  episodes?: number;
  type?: string;
  status?: string;
  chapters?: number;
  name?: string;
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
