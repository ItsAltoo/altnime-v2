import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton loader untuk komponen CardCarousel.
 * @param {object} props - Properti komponen.
 * @param {number} [props.cards=6] - Jumlah kartu skeleton yang akan ditampilkan.
 * @returns {JSX.Element} Komponen skeleton untuk carousel kartu.
 */
const CardCarouselSkeleton = ({ cards = 6 }: { cards?: number }) => {
  return (
    <div className="py-8 mx-8">
      {/* Skeleton untuk Judul Section */}
      <Skeleton className="h-8 w-64 mb-4" />

      <div className="w-full relative">
        <div className="overflow-hidden">
          <div className="flex -ml-2">
            {/* Membuat array sejumlah 'cards' untuk di-map menjadi skeleton */}
            {Array.from({ length: cards }).map((_, index) => (
              <div
                key={index}
                className="w-1/6 pl-2 basis-1/6 flex-shrink-0"
              >
                <div className="space-y-2">
                  {/* Skeleton untuk Gambar Kartu */}
                  <Skeleton className="h-64 w-full rounded-md" />
                  {/* Skeleton untuk Judul Kartu */}
                  <Skeleton className="h-5 w-5/6" />
                  {/* Skeleton untuk detail kecil (skor/episode) */}
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { CardCarouselSkeleton };
