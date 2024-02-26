import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonAccordionTrigger = () => (
  <div className="h-[60px] flex items-center justify-between border-b">
    <Skeleton className="w-[140px] h-[26px]" />
    <Skeleton className="w-[16px] h-[16px]" />
  </div>
);
