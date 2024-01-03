"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { CircleUserRoundIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navigation: React.FC<React.PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);

  useEffect(() => {
    setIsVisibleMenu(false);
  }, [pathname]);

  const handleToggleMenuVisibility = () => setIsVisibleMenu((prev) => !prev);

  return (
    <>
      <ul
        className={cn(
          "max-h-0 mx-auto md:mx-0 w-full overflow-hidden md:overflow-visible md:w-auto md:max-h-none flex text-sm uppercase md:pl-3 items-between flex-col md:flex-row items-center md:flex-wrap transition-all duration-700",
          isVisibleMenu && "max-h-[100vh] md:max-h-none"
        )}
      >
        {children}
      </ul>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger>
            <CircleUserRoundIcon />
          </PopoverTrigger>
          <PopoverContent className="z-[9999] max-w-[200px] flex items-center justify-between">
            <Link href="/register">
              <Button>Register</Button>
            </Link>
            <Link href="/login">
              <Button>Log In</Button>
            </Link>
          </PopoverContent>
        </Popover>
        <Button
          variant="outline"
          className="bg-transparent md:hidden"
          onClick={handleToggleMenuVisibility}
        >
          <HamburgerMenuIcon />
        </Button>
      </div>
    </>
  );
};

export default Navigation;
