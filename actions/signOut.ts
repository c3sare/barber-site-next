"use server";

import { signOut as NextAuthSignOut } from "@/auth.config";

export const signOut = async () => {
  const logout = await NextAuthSignOut({ redirect: false });

  return logout;
};
