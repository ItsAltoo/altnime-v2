export interface ImageTypes {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface MalUrl {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Aired {
  from: string;
  to: string;
  prop: {
    from: { day: number; month: number; year: number };
    to: { day: number; month: number; year: number };
  };
  string: string;
}

export interface Anime {
  mal_id: number;
  title: string;
  images: { jpg: ImageTypes; webp: ImageTypes };
  score: number;
  episodes: number;
  type: string;
  url: string;
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
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  titles: { type: string; title: string }[];

  // --- Informasi Dasar ---
  type: string;
  source: string;
  episodes: number;
  status: string; // e.g., "Finished Airing", "Currently Airing"
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string; // e.g., "PG-13 - Teens 13 or older"

  // --- Skor dan Popularitas ---
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;

  // --- Sinopsis dan Latar Belakang ---
  synopsis: string;
  background: string;

  // --- Musim dan Penyiaran ---
  season: string;
  year: number;
  broadcast: {
    day: string;
    time: string;
    timezone: string;
    string: string;
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

  trailer: {
    embed_url: string;
    url: string;
    images:{
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    }
  };

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
  category?: string;
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

export interface HeadingDetailProps {
  title: string;
  poster: string;
  background: string;
  genres: MalUrl[];
  episodes: number | string;
  type: string;
  aired: Aired;
  info: {
    status: string;
    members: number;
    score: number;
    rank: number;
    favorites: number;
  };
}