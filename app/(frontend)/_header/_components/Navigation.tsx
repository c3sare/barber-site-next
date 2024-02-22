"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { CircleUserRoundIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type NavigationProps = {
  children?: React.ReactNode;
  account?: React.ReactNode;
};

const Navigation: React.FC<NavigationProps> = ({ children, account }) => {
  const user = useCurrentUser();
  const pathname = usePathname();
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);
  const [isVisibleAccount, setIsVisibleAccount] = useState<boolean>(false);

  useEffect(() => {
    setIsVisibleMenu(false);
    setIsVisibleAccount(false);
  }, [pathname]);

  const handleToggleMenuVisibility = () => setIsVisibleMenu((prev) => !prev);

  return (
    <>
      <ul
        className={cn(
          "max-h-0 mx-auto order-last md:order-none md:mx-0 w-full overflow-hidden md:overflow-visible md:w-auto md:max-h-none flex text-sm uppercase md:pl-3 items-between flex-col md:flex-row items-center md:flex-wrap transition-all duration-700",
          isVisibleMenu && "max-h-[100vh] md:max-h-none"
        )}
      >
        {children}
      </ul>
      <div className="flex items-center gap-2">
        <Popover
          open={isVisibleAccount}
          onOpenChange={(state) => setIsVisibleAccount(state)}
        >
          <PopoverTrigger>
            {user?.image ? (
              <Image
                src={user.image}
                width={32}
                height={32}
                className="rounded-full"
                alt="Avatar"
              />
            ) : (
              <CircleUserRoundIcon />
            )}
            <span className="sr-only">Profile</span>
          </PopoverTrigger>
          <PopoverContent className="z-[9999] max-w-[200px]">
            {account}
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
