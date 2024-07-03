import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full min-h-[200px] flex items-center justify-center">
      <Loader className="animate-spin size-16" />
    </div>
  );
}
