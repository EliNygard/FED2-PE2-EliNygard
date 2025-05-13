import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="page-padding md:p-0 m-auto max-w-[1120px]">
      <div className="mb-4">
        <Skeleton className="w-full h-96" />
      </div>
      <div className="mb-8 flex flex-col gap-4">
        <Skeleton className="w-3/5 h-12 rounded-md" />
        <Skeleton className="w-full h-10 rounded-md my-8" />
      </div>
      <div className="flex flex-row gap-4">
        <Skeleton className="h-96 w-1/2 rounded-md mb-4" />
        <Skeleton className="h-96 w-1/2 rounded-md mb-4" />
      </div>
    </div>
  );
}
