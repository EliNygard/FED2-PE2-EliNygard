import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-[32px] page-padding">
      <div className="grid gap-6 grid-cols-1 min-[440px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {"abcdefghi".split("").map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
      <div className="flex flex-col gap-3">
        <Skeleton className="w-full h-60" />
        <Skeleton className="w-2/3 h-4 rounded-md mb-2.5" />
        <Skeleton className="w-1/4 h-4 rounded-md" />
        <Skeleton className="w-1/3 h-4 rounded-md" />
      </div>
  );
}
