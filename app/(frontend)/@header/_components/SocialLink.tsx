import { IconProps } from "@radix-ui/react-icons/dist/types";
import { LucideIcon } from "lucide-react";

type SocialLinkButtonProps = {
  icon:
    | React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
      >
    | LucideIcon;
  href: string;
};

const SocialLinkButton: React.FC<SocialLinkButtonProps> = ({
  icon: Icon,
  href,
}) => {
  return (
    <a
      href={href}
      target="__blank"
      className="bg-black text-white w-[25px] h-[25px] leading-[25px] text-center flex items-center justify-center"
    >
      <Icon width={16} height={16} />
    </a>
  );
};

export default SocialLinkButton;
