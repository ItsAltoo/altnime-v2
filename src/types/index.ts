export interface Anime {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string } };
  score: number;
  episodes: number;
  type: string;
  url?: string;
  genres: { mal_id: number }[];
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
};