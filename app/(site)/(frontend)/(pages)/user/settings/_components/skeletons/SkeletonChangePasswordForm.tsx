import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonInputWithLabel } from "./SkeletonInputWithLabel";

export const SkeletonChangePasswordForm = () => (
  <div className="max-w-sm mx-auto flex flex-col gap-2 items-center justify-center">
    <SkeletonInputWithLabel />
    <SkeletonInputWithLabel />
    <SkeletonInputWithLabel />
    <Skeleton className="h-[40px] mx-auto w-[80px]" />
  </div>
);
