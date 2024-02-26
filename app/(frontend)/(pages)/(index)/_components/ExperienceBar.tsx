"use client";

import { IconType } from "@/components/icons/IconType";
import { animated, useInView } from "@react-spring/web";

type ExperienceBarProps = {
  icon: IconType;
  title: string;
  value: number;
};

export const ExperienceBar: React.FC<ExperienceBarProps> = ({
  icon: Icon,
  title,
  value,
}) => {
  const [ref, props] = useInView(
    () => ({
      from: { width: "0%" },
      to: { width: `${value}%` },
    }),
    {
      rootMargin: "84px 0px 0px 0px",
    }
  );

  return (
    <div className="my-8">
      <div className="flex items-center gap-2 mb-[10px]">
        <Icon width={16} height={16} />
        <span className="text-xs font-bold">{title}</span>
      </div>
      <div className="h-[24px] w-full bg-[#f7f8fa]">
        <animated.div
          className="h-[24px] bg-[#486b71] relative overflow-hidden"
          ref={ref}
          style={props}
        >
          <div className="absolute bottom-0 h-full text-xs font-bold tracking-widest py-1 w-8 text-center text-white right-0">
            {value}
          </div>
        </animated.div>
      </div>
    </div>
  );
};
