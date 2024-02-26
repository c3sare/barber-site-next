"use server";

import { signOut } from "@/auth";

export const logoutUser = async () => {
  return await signOut();
};
