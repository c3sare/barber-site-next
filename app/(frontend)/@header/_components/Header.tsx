"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Header: React.FC<React.PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 py-4 bg-header-full text-header-foreground",
        isHomePage && "fixed w-full bg-header"
      )}
    >
      {children}
    </header>
  );
};

export default Header;
