"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import { socials } from "../_data/socials";
import SocialLinkButton from "./SocialLink";
import { contacts } from "../_data/contacts";
import TopBarLinkButton from "./TopBarLinkButton";
import { animated, useTransition } from "@react-spring/web";
import { TooltipProvider } from "@/components/ui/tooltip";

const HeaderHeightContext = createContext(0);

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

  const handleResizeScreen = useCallback(() => {
    const contactDivHeight = contactRef.current?.clientHeight ?? 0;
    setHeaderHeight(headerRef.current!.clientHeight + contactDivHeight ?? 0);
  }, []);

  const transition = useTransition(!isHomePage, {
    from: {
      maxHeight: "0px",
    },
    enter: {
      maxHeight: "100px",
      onResolve: handleResizeScreen,
    },
    leave: {
      maxHeight: "0px",
      onResolve: handleResizeScreen,
    },
  });

  useEffect(() => {
    window.addEventListener("resize", handleResizeScreen, true);

    return () => window.removeEventListener("resize", handleResizeScreen, true);
  }, [handleResizeScreen]);

  return (
    <div
      className={cn(
        "w-full transition-all sticky top-0 z-[9999]",
        isHomePage && "h-0"
      )}
    >
      {transition(
        (style, item) =>
          item && (
            <animated.div
              className="bg-header-full overflow-hidden"
              ref={contactRef}
              style={style}
            >
              <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-center md:justify-between flex-wrap gap-2">
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
                  <TooltipProvider>
                    {socials.map((item) => (
                      <SocialLinkButton
                        key={item.name}
                        icon={item.icon}
                        href={item.href}
                        name={item.name}
                      />
                    ))}
                  </TooltipProvider>
                </div>
              </div>
            </animated.div>
          )
      )}
      <header
        ref={headerRef}
        className={cn(
          "w-full py-4 text-header-foreground transition-colors duration-300 delay-200",
          isHomePage ? "md:bg-header bg-header-full" : "bg-header-sticky"
        )}
      >
        <HeaderHeightContext.Provider value={headerHeight}>
          {children}
        </HeaderHeightContext.Provider>
      </header>
    </div>
  );
};

export default Header;
