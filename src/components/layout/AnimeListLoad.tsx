import { Skeleton } from "@/components/ui/skeleton";
import Grid from "@/views/Seasons/Grid";

export default function Loading() {
  return (
    <Grid>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-[250px] w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </Grid>
  );
}
