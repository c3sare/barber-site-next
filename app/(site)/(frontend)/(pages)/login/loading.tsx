import { Skeleton } from "@/components/ui/skeleton";

export default function LoginLoading() {
  return (
    <>
      <div className="max-w-[300px] mx-auto flex items-center justify-center my-16 flex-col">
        <div className="flex gap-2 flex-col items-center">
          <h1 className="text-4xl after:left-1/2 after:-translate-x-1/2">
            Log In Panel
          </h1>
          <div className="space-y-2 w-full max-w-[300px]">
            <Skeleton className="w-[200px] h-[17px]" />
            <Skeleton className="w-full h-10" />
          </div>
          <div className="space-y-2 w-full max-w-[300px]">
            <Skeleton className="w-[200px] h-[17px]" />
            <Skeleton className="w-full h-10" />
          </div>
          <Skeleton className="h-10 w-[73px]" />
        </div>
        <div className="w-full my-4 relative max-w-[300px]">
          <Skeleton className="px-3 h-[17px] relative" />
        </div>
        <div className="flex items-center justify-center gap-4 text-sm w-full max-w-[300px] flex-wrap">
          <Skeleton className="h-[40px] w-[140px]" />
          <Skeleton className="h-[40px] w-[140px]" />
        </div>
        <Skeleton className="my-4 w-full h-4" />
        <Skeleton className="mb-4 w-full h-4" />
      </div>
    </>
  );
}
