import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  CircleUserRoundIcon,
  FileClockIcon,
  ListOrderedIcon,
  SettingsIcon,
  ShieldEllipsisIcon,
} from "lucide-react";
import Image from "next/image";
import { AccountPopover } from "./AccountPopover";
import { MobileMenu } from "./MobileMenu";
import { auth, signOut } from "@/auth.config";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AccountListItem from "./AccountListItem";

type NavigationProps = {
  children?: React.ReactNode;
};

const Navigation: React.FC<NavigationProps> = async ({ children }) => {
  const session = await auth();

  const user = session?.user;

  return (
    <>
      <ul className="mx-auto w-full hidden md:flex text-sm uppercase pl-3 items-between flex-row justify-center items-center flex-wrap">
        {children}
      </ul>
      <div className="flex items-center gap-2">
        <AccountPopover>
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
            {user ? (
              <>
                <div className="flex items-center gap-3 w-full">
                  <Image
                    src={user.image ?? "/images/avatar.png"}
                    width={32}
                    height={32}
                    alt={user.name ?? "Avatar"}
                    className="rounded-full"
                  />
                  <span className="text-sm">
                    {user.name ?? user.email ?? "Unknown user"}
                  </span>
                </div>
                <ul className="w-full flex flex-col">
                  <AccountListItem
                    title="Booking History"
                    href="/user/booking-history"
                    icon={FileClockIcon}
                  />
                  <AccountListItem
                    title="Order History"
                    href="/user/order-history"
                    icon={ListOrderedIcon}
                  />
                  <AccountListItem
                    title="Settings"
                    href="/user/settings"
                    icon={SettingsIcon}
                  />
                  {user.role === "ADMIN" && (
                    <AccountListItem
                      title="Admin Panel"
                      href="/admin"
                      icon={ShieldEllipsisIcon}
                    />
                  )}
                </ul>
                <form className="w-full my-2">
                  <Button
                    className="mx-auto block"
                    formAction={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    Logout
                  </Button>
                </form>
              </>
            ) : (
              <div className="flex justify-between w-full">
                <Button asChild>
                  <Link href="/register">Register</Link>
                </Button>

                <Button asChild>
                  <Link href="/login">Log In</Link>
                </Button>
              </div>
            )}
          </PopoverContent>
        </AccountPopover>
        <MobileMenu>{children}</MobileMenu>
      </div>
    </>
  );
};

export default Navigation;
