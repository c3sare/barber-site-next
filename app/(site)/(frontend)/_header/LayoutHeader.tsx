import Image from "next/image";

import logo from "@/public/images/logo.png";
import Link from "next/link";
import NavLinkHeader from "./_components/NavLinkHeader";
import Header from "./_components/Header";
import Navigation from "./_components/Navigation";
import db from "@/lib/drizzle";

const LayoutHeader = async () => {
  const menu = await db.query.menu.findFirst({
    where: (menu, { eq }) => eq(menu.usedBy, "HEADER"),
    with: {
      items: {
        with: {
          page: true,
        },
      },
    },
  });

  const menuItems = menu?.items ?? [];

  return (
    <Header>
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 flex-wrap md:flex-nowrap">
        <Link href="/" className="w-[calc(100%_-_90px)] sm:w-auto">
          <Image src={logo} alt="Logo" priority height={50} />
        </Link>
        <Navigation>
          {menuItems.map((route, i) => (
            <NavLinkHeader
              key={i}
              title={route.name}
              href={route.url ?? `/page/${route.page?.slug}`}
              {...route}
            />
          ))}
        </Navigation>
      </nav>
    </Header>
  );
};

export default LayoutHeader;
