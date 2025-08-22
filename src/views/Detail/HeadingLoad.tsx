import { Skeleton } from "@/components/ui/skeleton";

export function HeadingSkeleton() {
  return (
    <>
      {/* BACKGROUND SKELETON */}
      <Skeleton className="absolute inset-0 h-60 md:h-72 -z-10" />

      <div className="border-b pb-10 md:pb-20">
        {/* NAVIGATION SKELETONS */}
        <div className="mb-5 w-full h-14 flex items-center justify-between">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="size-10 rounded-full" />
        </div>

        {/* LAYOUT UTAMA SKELETON (Meniru struktur responsif asli) */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
          {/* POSTER SKELETON */}
          <Skeleton className="w-40 md:w-52 h-60 md:h-80 rounded-lg flex-shrink-0" />

          <div className="flex flex-col justify-between w-full">
            {/* JUDUL SKELETON */}
            <Skeleton className="h-9 md:h-14 w-full md:w-4/5 rounded-md mt-2" />

            <div className="flex flex-col gap-3 mt-4 w-full items-center md:items-start">
              {/* META INFO SKELETONS */}
              <div className="flex flex-col items-center md:items-start gap-2 w-1/3">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
              </div>
              <Skeleton className="h-7 w-24 rounded-full mt-1" />

              {/* GENRE BADGES SKELETONS */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
                <Skeleton className="h-7 w-20 rounded-full" />
                <Skeleton className="h-7 w-24 rounded-full" />
                <Skeleton className="h-7 w-16 rounded-full" />
                <Skeleton className="h-7 w-20 rounded-full" />
              </div>

              {/* AKSI & STATS SKELETONS (Meniru struktur responsif asli) */}
              <div className="flex flex-col md:flex-row w-full items-center md:items-end justify-between mt-5 gap-4">
                {/* Tombol Bookmark Skeleton */}
                <Skeleton className="h-10 w-36 rounded-md" />

                {/* Stats Skeletons */}
                <div className="gap-2 flex flex-wrap justify-center">
                  <Skeleton className="h-6 w-16 rounded-md" />
                  <Skeleton className="h-6 w-16 rounded-md" />
                  <Skeleton className="h-6 w-16 rounded-md" />
                  <Skeleton className="h-6 w-16 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}