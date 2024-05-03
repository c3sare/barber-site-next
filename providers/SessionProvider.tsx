import { auth } from "@/auth.config";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export const SessionProvider: React.FC<React.PropsWithChildren> = async ({
  children,
}) => {
  const session = await auth();

  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
};
