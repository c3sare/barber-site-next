import Image from "next/image";

import logo from "@/public/images/logo.png";
import Link from "next/link";
import NavLinkHeader from "./_components/NavLinkHeader";
import Header from "./_components/Header";
import Navigation from "./_components/Navigation";
import NavLinkHeaderChild from "./_components/NavLinkHeaderChild";
import Account from "./_components/Account";
import db from "@/lib/drizzle";

const LayoutHeader = async () => {
  const menu = await db.query.menu.findFirst({
    where: (menu, { eq }) => eq(menu.usedBy, "HEADER"),
    with: {
      items: true,
    },
  });

  const menuItems = menu?.items ?? [];

  return (
    <Header>
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 flex-wrap md:flex-nowrap">
        <Link href="/" className="w-[calc(100%_-_90px)] sm:w-auto">
          <Image
            src={logo}
            alt="Logo"
            className="dark:invert"
            priority
            height={50}
          />
        </Link>
        <Navigation account={<Account />}>
          {menuItems.map((route, i) => (
            <NavLinkHeader
              key={i}
              title={route.name}
              href={`/page/${route.url}`}
              {...route}
            />
          ))}
        </Navigation>
      </nav>
    </Header>
  );
};

export default LayoutHeader;
