import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonInputWithLabel } from "./_components/skeletons/SkeletonInputWithLabel";
import { SkeletonAccordionTrigger } from "./_components/skeletons/SkeletonAccordionTrigger";

export default function LoadingSettings() {
  return (
    <div className="mx-auto max-w-7xl py-8 px-4">
      <h1 className="text-5xl text-center after:left-1/2 after:-translate-x-1/2">
        Settings
      </h1>
      <SkeletonAccordionTrigger />
      <div className="flex justify-center items-center gap-6 border-b pb-4">
        <Skeleton className="w-[128px] h-[128px]" />
        <div className="flex flex-col items-center justify-center gap-2">
          <SkeletonInputWithLabel />
          <SkeletonInputWithLabel />
          <SkeletonInputWithLabel />
          <Skeleton className="w-[80px] h-[40px]" />
        </div>
      </div>
      <SkeletonAccordionTrigger />
    </div>
  );
}
