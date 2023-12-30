import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type BarberBoxProps = {
  id: number;
  name: string;
  image: string;
  availability: {
    day: string;
    start: string;
    end: string;
  }[];
};

const BarberBox: React.FC<BarberBoxProps> = ({ name, image, availability }) => {
  return (
    <div className="w-full md:w-1/2 xl:w-1/4 float-left">
      <div className="flex flex-col items-center justify-center mx-4 bg-white shadow-sm gap-4 pt-6">
        <h4 className="w-full text-center after:left-1/2 after:-translate-x-1/2">
          {name}
        </h4>
        <Image src={image} alt={name} width={222} height={222} />
        <span className="text-2xl">AVAILABILITY</span>
        <div className="flex flex-col gap-2 items-center justify-center">
          {availability.map((work) => (
            <span key={work.day}>
              {work.day} {work.start} {work.end}
            </span>
          ))}
        </div>
        <Button asChild>
          <Link href="/book-now" className="translate-y-1/2 rounded-none">
            BOOK NOW
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default BarberBox;
