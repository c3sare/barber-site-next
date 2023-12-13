"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const Navigation: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);

  const handleToggleMenuVisibility = () => setIsVisibleMenu((prev) => !prev);

  return (
    <>
      <Button
        variant="outline"
        className="bg-transparent md:hidden"
        onClick={handleToggleMenuVisibility}
      >
        <HamburgerMenuIcon />
      </Button>
      <ul
        className={cn(
          "max-h-0 mx-auto md:mx-0 w-full overflow-hidden md:overflow-visible md:w-auto md:max-h-none flex text-sm uppercase md:pl-3 items-between flex-col md:flex-row items-center md:flex-wrap transition-all duration-700",
          isVisibleMenu && "max-h-[100vh] md:max-h-none"
        )}
      >
        {children}
      </ul>
    </>
  );
};

export default Navigation;
