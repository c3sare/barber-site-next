import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SlideChangeButtonProps = {
  variant: "prev" | "next";
  onClick?: React.HTMLAttributes<HTMLButtonElement>["onClick"];
  name: string;
};

const SlideChangeButton: React.FC<SlideChangeButtonProps> = ({
  variant,
  onClick,
  name,
}) => {
  const icons = {
    prev: {
      icon: ChevronLeft,
      className: "left-0",
    },
    next: { icon: ChevronRight, className: "right-0" },
  };

  const { icon: Icon, className } = icons[variant];
  return (
    <button
      className={cn(
        "absolute top-1/2 -translate-y-1/2 bg-[#333] text-white w-[30px] h-[110px] flex items-center justify-center md:opacity-0 transition-opacity duration-500 group-hover:opacity-100",
        className
      )}
      onClick={onClick}
    >
      <Icon width={32} height={32} />
      <span className="sr-only">{name}</span>
    </button>
  );
};

export default SlideChangeButton;
