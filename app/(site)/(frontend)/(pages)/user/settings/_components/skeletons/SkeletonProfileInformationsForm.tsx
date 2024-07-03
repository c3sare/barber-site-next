import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonInputWithLabel } from "./SkeletonInputWithLabel";

export const SkeletonProfileInformationsForm = () => (
  <div className="flex flex-col items-center justify-center gap-2">
    <SkeletonInputWithLabel />
    <SkeletonInputWithLabel />
    <SkeletonInputWithLabel />
    <Skeleton className="w-[80px] h-[40px]" />
  </div>
);
