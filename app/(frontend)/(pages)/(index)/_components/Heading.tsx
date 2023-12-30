import Image from "next/image";
import { cn } from "@/lib/utils";

type HeadingProps = {
  children?: React.ReactNode;
  className?: string;
  image?: string;
};

const Heading: React.FC<HeadingProps> = ({ children, className, image }) => {
  const heading = (
    <h4
      className={cn(
        "text-4xl text-center text-white after:content-none before:content-none drop-shadow-xs opacity-90",
        className
      )}
    >
      {children}
    </h4>
  );

  if (image) {
    return (
      <div className="z-10 flex justify-center items-center flex-col">
        <Image src={image} alt="Cutter image" width={100} height={33} />
        {heading}
      </div>
    );
  }
  return heading;
};

export default Heading;
