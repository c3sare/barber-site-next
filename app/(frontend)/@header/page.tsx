import { ThemeModeToggle } from "./_components/ThemeModeToggle";

import Image from "next/image";

import logo from "@/public/images/logo.png";
import Link from "next/link";
import NavLinkHeader from "./_components/NavLinkHeader";

const routing = [
  {
    href: "/",
    title: "Home",
  },
  {
    href: "/barbers",
    title: "Barbers",
  },
  {
    href: "/services",
    title: "Services",
  },
  {
    href: "/shop",
    title: "Shop",
  },
  {
    href: "/gallery",
    title: "Gallery",
  },
  {
    href: "/blog",
    title: "Blog",
  },
  {
    href: "/contact",
    title: "Contact",
  },
  {
    href: "/book-now",
    title: "Book now",
    label: "Hot",
  },
];

const LayoutHeader = () => {
  return (
    <header className="sticky top-0 py-4 bg-header text-header-foreground">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <Image src={logo} alt="Logo" className="dark:invert" height={50} />
        </Link>
        <ul className="flex text-sm uppercase pl-3 items-center">
          {routing.map((route, i) => (
            <NavLinkHeader key={i} {...route} />
          ))}
          <li>
            <ThemeModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default LayoutHeader;
