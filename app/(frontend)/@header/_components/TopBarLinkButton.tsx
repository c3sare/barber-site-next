import { LucideIcon } from "lucide-react";
import React from "react";

type TopBarLinkButtonProps = {
  href?: string;
  children?: React.ReactNode;
  icon: LucideIcon;
};

const TopBarLinkButton: React.FC<TopBarLinkButtonProps> = ({
  children,
  href,
  icon: Icon,
}) => {
  return React.createElement(
    href ? "a" : "span",
    {
      ...(href ? { href } : {}),
      className:
        "text-white mr-4 text-xs flex gap-1 items-center whitespace-nowrap",
    },
    ...[<Icon width={13} height={13} key={0} />, children]
  );
};

export default TopBarLinkButton;
