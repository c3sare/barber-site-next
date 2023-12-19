import { cn } from "@/lib/utils";
import Image from "next/image";

type ContainerProps = {
  children?: React.ReactNode;
  bgImageUrl?: string;
  wrapperClassName?: string;
  className?: string;
};

const Container: React.FC<ContainerProps> = ({
  children,
  bgImageUrl,
  wrapperClassName,
  className,
}) => {
  return (
    <div className={cn("w-full relative", wrapperClassName)}>
      {!!bgImageUrl && (
        <Image
          src={bgImageUrl}
          fill
          sizes="100vw"
          alt="Background Image"
          className="object-cover object-right z-[-1] select-none"
        />
      )}
      <div className={cn("max-w-7xl mx-auto px-4 w-full", className)}>
        {children}
      </div>
    </div>
  );
};

export default Container;
