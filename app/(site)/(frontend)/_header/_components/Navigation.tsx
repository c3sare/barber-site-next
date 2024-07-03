"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { CircleUserRoundIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

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
      <ul className="mx-auto w-full hidden md:flex text-sm uppercase pl-3 items-between flex-row justify-center items-center flex-wrap">
        {children}
      </ul>
      <Sheet open={isVisibleMenu} onOpenChange={setIsVisibleMenu}>
        <SheetContent side="left">
          <SheetTitle className="text-3xl">Menu</SheetTitle>
          <ul className="flex flex-col list-none">{children}</ul>
        </SheetContent>
      </Sheet>
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
          <span className="sr-only">Menu</span>
        </Button>
      </div>
    </>
  );
};

export default Navigation;
