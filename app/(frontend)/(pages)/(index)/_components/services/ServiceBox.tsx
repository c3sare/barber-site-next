import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type ServiceBoxProps = {
  href: string;
  description: string;
  image: string;
  title: string;
};

const ServiceBox: React.FC<ServiceBoxProps> = ({
  title,
  image,
  description,
  href,
}) => {
  return (
    <div className="w-full md:w-1/3 float-left pb-6">
      <div className="bg-white p-6 border-b-2 border-b-gray-300 flex flex-col items-center mx-6 shadow-sm pb-8 relative">
        <h4 className="text-center w-full after:left-1/2 after:-translate-x-1/2">
          {title}
        </h4>
        <Image
          className="max-w-full h-auto"
          src={image}
          alt={title}
          width={320}
          height={213}
        />
        <p className="text-xs">{description}</p>

        <Button asChild className="absolute top-full -translate-y-1/2">
          <Link href={href}>
            READ MORE <span className="sr-only">read more about {title}</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ServiceBox;
