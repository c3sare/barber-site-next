import { Button } from "@/components/ui/button";
import { MessageCircleIcon, PenLineIcon } from "lucide-react";
import Image from "next/image";

type BlogPostProps = {
  id: number;
  title: string;
  image: string;
  comments: number;
  author: string;
  description: string;
};

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  image,
  comments,
  author,
  description,
}) => {
  return (
    <div className="float-left w-full sm:w-1/2 md:w-1/2 lg:w-1/4 mb-8 self-stretch">
      <div className="mx-2 p-1 bg-[#f7f8fa] flex flex-col items-center text-center shadow-sm self-stretch">
        <h4 className="before:content-none after:left-1/2 after:-translate-x-1/2 text-lg">
          {title}
        </h4>
        <Image src={image} alt={title} width={250} height={149} />
        <div className="flex items-center justify-center gap-4 w-full my-2 text-xs">
          <div className="flex items-center gap-1">
            <MessageCircleIcon width={20} height={20} /> {comments} Comments
          </div>
          <div className="flex items-center gap-1">
            <PenLineIcon width={20} height={20} /> by {author}
          </div>
        </div>
        <p className="my-2 text-sm">{description}</p>
        <Button className="rounded-none relative top-2 translate-y-1/2">
          READ MORE
        </Button>
      </div>
    </div>
  );
};

export default BlogPost;
