import { IconProps } from "@radix-ui/react-icons/dist/types";
import { ChevronUp, LucideIcon } from "lucide-react";
import { useState } from "react";
import { animated, useTransition } from "@react-spring/web";

type SocialLinkButtonProps = {
  icon:
    | React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
      >
    | LucideIcon;
  href: string;
  name: string;
};

const SocialLinkButton: React.FC<SocialLinkButtonProps> = ({
  icon: Icon,
  href,
  name,
}) => {
  const [isVisibleTooltip, setIsVisibleTooltip] = useState<boolean>(false);
  const transition = useTransition(isVisibleTooltip, {
    from: {
      opacity: "0",
    },
    enter: {
      opacity: "1",
    },
    leave: {
      opacity: "0",
    },
  });

  return (
    <span className="relative">
      <a
        href={href}
        target="__blank"
        className="bg-black text-white w-[25px] h-[25px] leading-[25px] text-center flex items-center justify-center"
        onMouseEnter={() => setIsVisibleTooltip(true)}
        onMouseLeave={() => setIsVisibleTooltip(false)}
      >
        <Icon width={16} height={16} />
      </a>
      {transition(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col justify-center z-[99999]"
            >
              <ChevronUp className="text-black w-2 h-2 mx-auto" />
              <div className="p-2 bg-header-full text-white text-[10px] uppercase">
                {name}
              </div>
            </animated.div>
          )
      )}
    </span>
  );
};

export default SocialLinkButton;
