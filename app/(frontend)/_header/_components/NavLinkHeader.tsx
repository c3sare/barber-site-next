"use client";

import Link from "next/link";

type NavLinkHeaderProps = {
  title: string;
  href: string;
  label?: string;
};

const NavLinkHeader: React.FC<NavLinkHeaderProps> = ({
  title,
  href,
  label,
}) => {
  return (
    <li className="relative group min-w-[200px] md:min-w-max">
      <span className="relative">
        <Link
          prefetch={false}
          href={href}
          className="block text-center uppercase text-xl md:text-sm leading-4 relative tracking-normal group-hover:text-primary transition-colors duration-500 p-4"
        >
          {title}
          {label && (
            <span className="text-[11px] inline text-white font-light normal-case leading-none p-[.1em_.4em_.2em] text-center align-super ml-[3px] whitespace-nowrap bg-primary">
              {label}
            </span>
          )}
        </Link>
      </span>
    </li>
  );
};

export default NavLinkHeader;
