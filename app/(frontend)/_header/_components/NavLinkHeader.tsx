"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import { useHeaderHeight } from "./Header";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type NavLinkHeaderProps = {
  title: string;
  href: string;
  label?: string;
  children?: React.ReactNode;
};

const NavLinkHeader: React.FC<NavLinkHeaderProps> = ({
  title,
  href,
  label,
  children,
}) => {
  const isPhone = useMediaQuery("(max-width: 768px)");
  const headerHeight = useHeaderHeight();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const transition = useTransition(isExpanded, {
    from: isPhone
      ? { maxHeight: "0" }
      : {
          opacity: 0,
        },
    enter: isPhone
      ? { maxHeight: "100em" }
      : {
          display: "flex",
          opacity: 1,
        },
    leave: isPhone
      ? {
          maxHeight: "0",
        }
      : {
          opacity: 0,
          delay: 100,
        },
    ...(isPhone ? {} : { duration: 100 }),
  });

  useEffect(() => {
    if (!isPhone && isExpanded) setIsExpanded(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPhone]);

  const onHoverItem = () => {
    setIsExpanded(true);
  };

  const onHoverItemLeave = () => {
    setIsExpanded(false);
  };

  return (
    <li
      className="relative group min-w-[200px] md:min-w-max"
      onMouseEnter={children && !isPhone ? () => onHoverItem() : undefined}
      onMouseLeave={children && !isPhone ? () => onHoverItemLeave() : undefined}
    >
      <span className="relative">
        <Link
          prefetch={false}
          href={href}
          className="block text-center uppercase text-xl md:text-sm leading-4 relative tracking-normal group-hover:text-primary transition-colors duration-500 p-4"
        >
          {title}
          {label && (
            <span className="text-[11px] inline text-white font-light normal-case leading-none p-[.1em_.4em_.2em] text-center align-super ml-[3px] whitespace-nowrap bg-[#a89d8e]">
              {label}
            </span>
          )}
        </Link>
        {children ? (
          <button
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronDown
              className={cn(
                "transition-transform duration-300 w-8 h-8",
                isExpanded && "rotate-180"
              )}
            />
          </button>
        ) : null}
      </span>
      {transition((style, item) =>
        item ? (
          <animated.ul
            style={{ ...style, top: headerHeight }}
            className="flex-col md:border md:border-secondary overflow-hidden md:overflow-visible md:fixed md:top-full md:bg-white md:text-black w-full md:w-[150px] normal-case md:shadow-md"
          >
            {children}
          </animated.ul>
        ) : null
      )}
    </li>
  );
};

export default NavLinkHeader;
