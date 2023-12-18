import Image from "next/image";

type ContainerProps = {
  children?: React.ReactNode;
  bgImageUrl?: string;
};

const Container: React.FC<ContainerProps> = ({ children, bgImageUrl }) => {
  return (
    <div className="w-full relative">
      {!!bgImageUrl && (
        <Image
          src={bgImageUrl}
          fill
          sizes="100vw"
          alt="Background Image"
          className="object-cover object-right z-[-1] select-none"
        />
      )}
      <div className="max-w-7xl mx-auto px-4 w-full">{children}</div>
    </div>
  );
};

export default Container;
