import { auth } from "@/auth.config";
import { Button } from "@/components/ui/button";
import db from "@/lib/drizzle";
import { notFound } from "next/navigation";
import z from "zod";
import Link from "next/link";
import { PasscodeForm } from "./_components/PasscodeForm";

import { user as userSchema } from "@/drizzle/schema";
import { and, eq, isNull } from "drizzle-orm";

type VerifyPageProps = {
  searchParams: {
    email?: string;
    passcode?: string;
  };
};

export default async function VerifyPage({
  searchParams: { email, passcode },
}: VerifyPageProps) {
  const session = await auth();
  if (
    !email ||
    !z.string().email().safeParse(email).success ||
    session?.user.id
  )
    return notFound();

  if (passcode)
    if (passcode.length !== 6 || isNaN(Number(passcode))) return notFound();

  const user = await db.query.user.findFirst({
    where: (user, { eq, and, isNull }) =>
      and(eq(user.email, email), isNull(user.emailVerified)),
    with: {
      accounts: true,
    },
  });

  if (!user || user.accounts.length !== 0) return notFound();

  if (passcode) {
    if (user.verifyPasscode === passcode) {
      const user = await db
        .update(userSchema)
        .set({
          emailVerified: new Date(),
          verifyPasscode: null,
        })
        .where(
          and(
            eq(userSchema.email, email),
            eq(userSchema.verifyPasscode, passcode),
            isNull(userSchema.emailVerified)
          )
        )
        .returning();

      if (!user)
        return (
          <div className="w-full h-screen flex flex-col items-center justify-center">
            Something went wrong, try again later...
          </div>
        );

      return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <h1>Your account has been activated</h1>
          <Button asChild className="mx-auto">
            <Link href="/login">Click here to login</Link>
          </Button>
        </div>
      );
    } else return notFound();
  }

  return <PasscodeForm email={email} />;
}
