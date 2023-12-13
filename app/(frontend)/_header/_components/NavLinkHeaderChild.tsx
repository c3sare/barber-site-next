import Link from "next/link";

type NavLinkHeaderChildProps = {
  title: string;
  href: string;
};

const NavLinkHeaderChild: React.FC<NavLinkHeaderChildProps> = ({
  title,
  href,
}) => {
  return (
    <li className="py-2 px-1 border-b border-secondary last:border-b-0 text-center md:text-left">
      <Link
        className="hover:text-primary transition-colors duration-500 text-xs tracking-normal py-1 px-5 leading-normal whitespace-nowrap"
        href={href}
      >
        {title}
      </Link>
    </li>
  );
};

export default NavLinkHeaderChild;
