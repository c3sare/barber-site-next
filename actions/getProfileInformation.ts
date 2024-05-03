import { auth } from "@/auth.config";
import db from "@/lib/drizzle";

export const getCurrentUserProfileInformations = async () => {
  const session = await auth();

  if (!session?.user.id) throw new Error("User not logged in!");

  const user = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.id, session?.user.id!),
  });

  return {
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
  };
};
