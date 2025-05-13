import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div>
        <Skeleton className="w-3/5 h-12 rounded-md mb-8" />
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          {"abcdef".split("").map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </>
  );
}

function SkeletonCard() {
  return (
     <div className="flex flex-row gap-3">
      <Skeleton className="h-20 w-20 rounded-md" />
      <div className="flex flex-col justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
    
  );
}
