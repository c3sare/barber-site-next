import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  FileClockIcon,
  ListOrderedIcon,
  SettingsIcon,
  ShieldEllipsisIcon,
} from "lucide-react";
import AccountListItem from "./AccountListItem";
import { auth, signOut } from "@/auth.config";

export default async function Account() {
  const session = await auth();

  const user = session?.user;

  return user ? (
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
      <Link href="/register">
        <Button>Register</Button>
      </Link>
      <Link href="/login">
        <Button>Log In</Button>
      </Link>
    </div>
  );
}
