"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Link from "next/link";
import Image from "next/image";
import {
  FileClockIcon,
  ListOrderedIcon,
  SettingsIcon,
  ShieldEllipsisIcon,
} from "lucide-react";
import AccountListItem from "./AccountListItem";
import { useTransition } from "react";
import { signOut } from "next-auth/react";

export default function Account() {
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();

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
      <div className="w-full my-2">
        <Button
          disabled={isPending}
          className="mx-auto block"
          onClick={() => startTransition(() => signOut())}
        >
          Logout
        </Button>
      </div>
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
