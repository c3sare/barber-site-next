import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSettings() {
  return (
    <div className="mx-auto max-w-7xl py-8 px-4">
      <h1 className="text-5xl text-center after:left-1/2 after:-translate-x-1/2">
        Settings
      </h1>
      <Skeleton className="w-full h-[558px] md:h-[406px]" />
    </div>
  );
}
