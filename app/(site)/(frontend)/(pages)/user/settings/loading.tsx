import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonAccordionTrigger } from "./_components/skeletons/SkeletonAccordionTrigger";
import { SkeletonProfileInformationsForm } from "./_components/skeletons/SkeletonProfileInformationsForm";

export default function LoadingSettings() {
  return (
    <div className="mx-auto max-w-7xl py-8 px-4">
      <h1 className="text-5xl text-center after:left-1/2 after:-translate-x-1/2">
        Settings
      </h1>
      <SkeletonAccordionTrigger>
        <div className="flex justify-center items-center gap-6 pb-4">
          <Skeleton className="w-[128px] h-[128px]" />
          <SkeletonProfileInformationsForm />
        </div>
      </SkeletonAccordionTrigger>
      <SkeletonAccordionTrigger />
    </div>
  );
}
