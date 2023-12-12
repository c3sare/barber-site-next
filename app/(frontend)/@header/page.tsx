import Image from "next/image";

import logo from "@/public/images/logo.png";
import Link from "next/link";
import NavLinkHeader from "./_components/NavLinkHeader";
import Header from "./_components/Header";
import Navigation from "./_components/Navigation";

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
    <Header>
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 flex-wrap">
        <Link href="/">
          <Image src={logo} alt="Logo" className="dark:invert" height={50} />
        </Link>
        <Navigation>
          {routing.map((route, i) => (
            <NavLinkHeader key={i} {...route} />
          ))}
        </Navigation>
      </nav>
    </Header>
  );
};

export default LayoutHeader;
