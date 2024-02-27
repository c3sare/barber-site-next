import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonInputWithLabel = () => (
  <div className="w-full max-w-[221px]">
    <Skeleton className="w-full h-[17px]" />
    <Skeleton className="h-[40px] mt-2 w-full" />
  </div>
);
