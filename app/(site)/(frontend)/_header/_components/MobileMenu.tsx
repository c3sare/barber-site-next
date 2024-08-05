"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const MobileMenu = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);

  useEffect(() => {
    setIsVisibleMenu(false);
  }, [pathname]);

  const handleToggleMenuVisibility = () => setIsVisibleMenu((prev) => !prev);

  return (
    <>
      <Sheet open={isVisibleMenu} onOpenChange={setIsVisibleMenu}>
        <SheetContent side="left">
          <SheetTitle className="text-3xl">Menu</SheetTitle>
          <ul className="flex flex-col list-none">{children}</ul>
        </SheetContent>
      </Sheet>
      <Button
        variant="outline"
        className="bg-transparent md:hidden"
        onClick={handleToggleMenuVisibility}
      >
        <HamburgerMenuIcon />
        <span className="sr-only">Menu</span>
      </Button>
    </>
  );
};
