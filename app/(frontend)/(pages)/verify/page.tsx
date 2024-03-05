import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import z from "zod";
import Link from "next/link";
import { PasscodeForm } from "./_components/PasscodeForm";

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

  const user = await db.user.findUnique({
    where: {
      email,
      emailVerified: null,
    },
    include: {
      accounts: true,
    },
  });

  if (!user || user.accounts.length !== 0) return notFound();

  if (passcode) {
    if (user.verifyPasscode === passcode) {
      const user = await db.user.update({
        where: {
          email,
          verifyPasscode: passcode,
          emailVerified: null,
        },
        data: {
          emailVerified: new Date(),
          verifyPasscode: null,
        },
      });

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
