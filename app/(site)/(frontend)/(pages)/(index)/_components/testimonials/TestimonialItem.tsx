import { Typography } from "@/components/typography";
import Image from "next/image";

type TestimonialItemProps = {
  id: number;
  avatar: string;
  name: string;
  content: string;
};

const TestimonialItem: React.FC<TestimonialItemProps> = ({
  avatar,
  name,
  content,
}) => {
  return (
    <div className="max-w-4xl mx-auto text-white">
      <Image
        src={avatar}
        alt={name}
        width={100}
        height={100}
        className="rounded-full mx-auto"
      />
      <Typography
        tag="h4"
        className="text-center text-2xl after:content-none before:content-none text-white my-6"
      >
        {name}
      </Typography>
      <p className="text-center text-base">{content}</p>
    </div>
  );
};

export default TestimonialItem;
