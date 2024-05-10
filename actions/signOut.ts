"use server";

import { signOut as NextAuthSignOut } from "@/auth.config";
import { redirect } from "next/navigation";

export const signOut = async () => {
  const logout = await NextAuthSignOut({ redirect: false });

  return logout;
};
