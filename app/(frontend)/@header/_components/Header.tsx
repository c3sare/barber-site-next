"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, createContext, useContext } from "react";
import { socials } from "../_data/socials";
import SocialLinkButton from "./SocialLink";
import { contacts } from "../_data/contacts";
import TopBarLinkButton from "./TopBarLinkButton";

const HeaderHeightContext = createContext<number>(0);

export const useHeaderHeight = () => {
  const height = useContext(HeaderHeightContext);

  return height;
};

const Header: React.FC<React.PropsWithChildren> = ({ children }) => {
  const contactRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleResizeScreen = () => {
      const contactDivHeight = contactRef.current?.clientHeight ?? 0;
      setHeaderHeight(headerRef.current!.clientHeight + contactDivHeight ?? 0);
    };

    handleResizeScreen();

    window.addEventListener("resize", handleResizeScreen, true);

    return () => window.removeEventListener("resize", handleResizeScreen, true);
  }, [pathname]);

  return (
    <>
      {!isHomePage && (
        <div className="bg-header-full" ref={contactRef}>
          <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-center md:justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {contacts.map((item) => (
                <TopBarLinkButton
                  key={item.name}
                  href={item.href}
                  icon={item.icon}
                >
                  {item.name}
                </TopBarLinkButton>
              ))}
            </div>
            <div className="flex items-center gap-1 justify-center">
              {socials.map((item) => (
                <SocialLinkButton
                  key={item.name}
                  icon={item.icon}
                  href={item.href}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <header
        ref={headerRef}
        className={cn(
          "sticky py-4 top-0 bg-header-sticky text-header-foreground",
          isHomePage && "md:fixed md:w-full md:bg-header bg-header-full py-4"
        )}
      >
        <HeaderHeightContext.Provider value={headerHeight}>
          {children}
        </HeaderHeightContext.Provider>
      </header>
    </>
  );
};

export default Header;
