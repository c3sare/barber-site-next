import { ZoomIcon } from "@/components/icons/ZoomIcon";
import Image from "next/image";

type AboutImageProps = {
  src: string;
  width: number;
  height: number;
};

export const AboutImage: React.FC<AboutImageProps> = ({
  src,
  width,
  height,
}) => {
  return (
    <div className="w-full group relative mb-4">
      <Image
        alt="About Image"
        src={src}
        className="max-w-full h-auto"
        width={width}
        height={height}
      />
      <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 bg-[rgba(0,_0,_0,_.6)] flex items-center justify-center duration-500 transition-opacity">
        <div className="w-8 h-8 bg-white flex items-center justify-center">
          <ZoomIcon />
        </div>
      </div>
    </div>
  );
};
