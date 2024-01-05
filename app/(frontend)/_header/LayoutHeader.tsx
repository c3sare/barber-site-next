import Image from "next/image";

import logo from "@/public/images/logo.png";
import Link from "next/link";
import NavLinkHeader from "./_components/NavLinkHeader";
import Header from "./_components/Header";
import Navigation from "./_components/Navigation";
import NavLinkHeaderChild from "./_components/NavLinkHeaderChild";
import Account from "./_components/Account";

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
    children: [
      {
        href: "/shop-catalog",
        title: "Shop Catalog",
      },
      {
        href: "/shop-sidebar",
        title: "Shop Sidebar",
      },
      {
        href: "/shop-single",
        title: "Shop Single",
      },
      {
        href: "/shop-single-alt",
        title: "Shop Single Alt",
      },
    ],
  },
  {
    href: "/gallery",
    title: "Gallery",
    children: [
      {
        href: "/masonry-style",
        title: "Masonry Style",
      },
      {
        href: "/fullwidth-grid",
        title: "Fullwidth grid",
      },
      {
        href: "/2-columns",
        title: "2 Columns",
      },
      {
        href: "/3-columns",
        title: "3 Columns",
      },
      {
        href: "/3-columns",
        title: "3 Columns",
      },
      {
        href: "/single-gallery",
        title: "Single Gallery",
      },
    ],
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
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 flex-wrap md:flex-nowrap">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            className="dark:invert"
            priority
            height={50}
          />
        </Link>
        <Navigation account={<Account />}>
          {routing.map((route, i) => (
            <NavLinkHeader key={i} {...route}>
              {route.children
                ? route.children?.map((child, childI) => (
                    <NavLinkHeaderChild key={childI} {...child} />
                  ))
                : null}
            </NavLinkHeader>
          ))}
        </Navigation>
      </nav>
    </Header>
  );
};

export default LayoutHeader;
