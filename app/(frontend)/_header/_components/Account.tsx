"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Link from "next/link";
import Image from "next/image";
import { logout } from "../_actions/logout";

export default function Account() {
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
      <ul></ul>
      <div className="w-full my-2">
        <Button className="mx-auto block" onClick={() => logout()}>
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
