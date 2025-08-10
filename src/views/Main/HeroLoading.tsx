import { Skeleton } from "@/components/ui/skeleton";

const HeroSkeleton = () => {
  return (
    <section className="w-full">
      <div className="container mx-auto">
        {/* Kontainer utama skeleton yang meniru layout hero */}
        <div className="relative flex h-screen items-center justify-center overflow-hidden">
          {/* Skeleton untuk background yang gelap */}
          <Skeleton className="absolute h-full w-full -z-10 bg-neutral-200 dark:bg-neutral-800" />

          <div className="flex w-full flex-col-reverse items-center justify-around gap-8 p-1 lg:flex-row">
            {/* Sisi kiri: Skeleton untuk konten teks */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {/* Skeleton untuk Badge */}
              <Skeleton className="h-7 w-36 rounded-md" />

              {/* Skeleton untuk Judul (h1) */}
              <div className="my-6 space-y-3">
                <Skeleton className="h-8 w-[300px] lg:h-12 lg:w-[550px]" />
                <Skeleton className="h-8 w-[250px] lg:h-12 lg:w-[450px]" />
              </div>

              {/* Skeleton untuk Sinopsis (p) */}
              <div className="mb-8 space-y-2">
                <Skeleton className="h-4 w-[350px] lg:w-[500px]" />
                <Skeleton className="h-4 w-[320px] lg:w-[480px]" />
                <Skeleton className="h-4 w-[340px] lg:w-[490px]" />
              </div>

              {/* Skeleton untuk Tombol */}
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                <Skeleton className="h-10 w-full sm:w-36" />
                <Skeleton className="h-10 w-full sm:w-36" />
              </div>
            </div>

            {/* Sisi kanan: Skeleton untuk Poster Anime */}
            <div className="hidden lg:block">
              <Skeleton className="h-[432px] w-[288px] rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeroSkeleton };
