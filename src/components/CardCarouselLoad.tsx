import { Skeleton } from "@/components/ui/skeleton";

const CardCarouselSkeleton = ({ cards = 6 }: { cards?: number }) => {
  return (
    <div className="py-8 mx-8">
      <Skeleton className="h-8 w-64 mb-4" />

      <div className="w-full relative">
        <div className="overflow-hidden">
          <div className="flex -ml-2">
            {Array.from({ length: cards }).map((_, index) => (
              <div
                key={index}
                className="w-1/6 pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 flex-shrink-0"
              >
                <div className="space-y-2">
                  <Skeleton className="h-64 w-full rounded-md" />
                  <Skeleton className="h-5 w-5/6" />
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
