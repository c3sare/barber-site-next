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
    <li>
      <Link
        href={href}
        className="uppercase leading-4 relative tracking-normal p-4 hover:text-primary transition-colors duration-500"
      >
        {title}
        {label && (
          <span className="text-[11px] inline text-white font-light normal-case leading-none p-[.1em_.4em_.2em] text-center align-super ml-[3px] whitespace-nowrap bg-[#a89d8e]">
            {label}
          </span>
        )}
      </Link>
    </li>
  );
};

export default NavLinkHeader;
