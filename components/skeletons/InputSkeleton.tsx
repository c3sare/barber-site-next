import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export const InputSkeleton: React.FC<{ className: string }> = ({
  className,
}) => (
  <div className={cn("space-y-2 w-full max-w-[300px]", className)}>
    <Skeleton className="w-[200px] h-[17px]" />
    <Skeleton className="w-full h-10" />
  </div>
);
