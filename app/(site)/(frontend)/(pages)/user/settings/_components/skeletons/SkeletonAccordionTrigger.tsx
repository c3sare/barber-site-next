import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonAccordionTrigger: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <div className="border-b">
    <div className="h-[60px] flex items-center justify-between">
      <Skeleton className="w-[140px] h-[26px]" />
      <Skeleton className="w-[16px] h-[16px]" />
    </div>
    {children}
  </div>
);
