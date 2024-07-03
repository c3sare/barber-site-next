"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { socials } from "../_data/socials";
import SocialLinkButton from "./SocialLink";
import { contacts } from "../_data/contacts";
import TopBarLinkButton from "./TopBarLinkButton";
import { TooltipProvider } from "@/components/ui/tooltip";

const Header: React.FC<React.PropsWithChildren> = ({ children }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div
      ref={headerRef}
      className={cn(
        "w-full top-0 z-10",
        isHomePage ? "sticky md:fixed" : "sticky"
      )}
    >
      <div className="bg-header-full overflow-hidden hidden md:block">
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
      </div>
      <header
        className={cn(
          "w-full py-4 text-header-foreground transition-colors duration-300 delay-200",
          isHomePage ? "md:bg-header bg-header-full" : "bg-header-sticky"
        )}
      >
        {children}
      </header>
    </div>
  );
};

export default Header;
