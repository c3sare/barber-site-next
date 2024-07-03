import { ZoomIcon } from "@/components/icons/ZoomIcon";
import Image from "next/image";

type WorkItemProps = {
  src: string;
  title: string;
};

export const WorkItem: React.FC<WorkItemProps> = ({ src, title }) => {
  return (
    <div className="w-1/4 group relative">
      <Image
        className="max-w-full"
        alt={title}
        src={src}
        width={200}
        height={200}
      />
      <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 bg-[rgba(0,_0,_0,_.6)] flex items-center justify-center duration-500 transition-opacity">
        <div className="w-8 h-8 bg-white flex items-center justify-center">
          <ZoomIcon />
        </div>
      </div>
    </div>
  );
};
