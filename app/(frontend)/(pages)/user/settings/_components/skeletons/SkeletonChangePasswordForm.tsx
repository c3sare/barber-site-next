import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonInputWithLabel } from "./SkeletonInputWithLabel";

export const SkeletonChangePasswordForm = () => (
  <div className="max-w-sm mx-auto">
    <SkeletonInputWithLabel />
    <SkeletonInputWithLabel />
    <SkeletonInputWithLabel />
    <Skeleton className="h-[40px] w-[80px]" />
  </div>
);
