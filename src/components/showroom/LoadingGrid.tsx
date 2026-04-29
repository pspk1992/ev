import { Skeleton } from "@/components/ui/skeleton";

interface LoadingGridProps {
  count?: number;
  label?: string;
}

export function LoadingGrid({ count = 3, label = "Loading" }: LoadingGridProps) {
  return (
    <section className="section-shell" aria-busy="true" aria-label={label}>
      <div className="mb-8 flex items-center justify-between gap-4">
        <Skeleton className="h-12 w-56 rounded-full" />
        <Skeleton className="h-10 w-36 rounded-full" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="data-card overflow-hidden p-4">
            <Skeleton className="mb-4 aspect-[16/10] w-full rounded-2xl" />
            <Skeleton className="mb-3 h-5 w-24 rounded-full" />
            <Skeleton className="mb-2 h-8 w-2/3" />
            <Skeleton className="mb-6 h-4 w-full" />
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-16 rounded-2xl" />
              <Skeleton className="h-16 rounded-2xl" />
              <Skeleton className="h-16 rounded-2xl" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
