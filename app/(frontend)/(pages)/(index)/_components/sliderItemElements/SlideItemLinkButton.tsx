import { cn } from "@/lib/utils";
import Link from "next/link";

const SlideItemLinkButton: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
> = ({ children, href, className, ...rest }) => {
  const props = {
    href,
    className: cn(
      "leading-[12px] my-[2.94872px] text-[#a89d8e] border border-white py-2 px-8 text-xl",
      className
    ),
    ...rest,
  };

  const isExternalLink = href.startsWith("http");

  if (isExternalLink) {
    return (
      <a {...props} target="_blank">
        {children}
      </a>
    );
  }

  return <Link {...props}>{children}</Link>;
};

export default SlideItemLinkButton;
