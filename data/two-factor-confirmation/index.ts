import db from "@/lib/drizzle";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation =
      await db.query.twoFactorConfirmation.findFirst({
        where: (twoFactorConfirmation, { eq }) =>
          eq(twoFactorConfirmation.userId, userId),
      });

    if (!twoFactorConfirmation) return null;

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
