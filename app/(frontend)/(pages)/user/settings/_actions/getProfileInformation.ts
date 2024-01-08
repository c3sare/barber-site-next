"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getProfileInformation = async () => {
  const session = await auth();

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  return {
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
  };
};
