import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonInputWithLabel = () => (
  <div>
    <Skeleton className="w-[45px] h-[17px]" />
    <Skeleton className="h-[40px] mt-2 w-[221px]" />
  </div>
);
