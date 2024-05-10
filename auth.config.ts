import NextAuth from "next-auth";

import db from "@/lib/drizzle";
import { getUserById } from "@/data/user";
// import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getAccountByUserId } from "./data/account";
import * as schema from "./drizzle/schema";

import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { loginSchema } from "@/validators/loginSchema";
import { getUserByEmail } from "@/data/user";
import { user } from "./drizzle/schema";
import { eq } from "drizzle-orm";

type UserRole = (typeof user.$inferSelect)["role"];

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/login",
  },
  // events: {
  //   async linkAccount({ user: userLink }) {
  //     await db
  //       .update(user)
  //       .set({ emailVerified: new Date() })
  //       .where(eq(user.id, userLink.id!));
  //   },
  // },
  // callbacks: {
  //   async signIn({ user, account }) {
  //     // Allow OAuth without email verification
  //     if (account?.provider !== "credentials") return true;

  //     // const existingUser = await getUserById(user.id!);

  //     // // Prevent sign in without email verification
  //     // if (!existingUser?.emailVerified) return false;

  //     // if (existingUser.isTwoFactorEnabled) {
  //     //   const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
  //     //     existingUser.id
  //     //   );

  //     //   if (!twoFactorConfirmation) return false;

  //     //   // Delete two factor confirmation for next sign in
  //     //   await db.twoFactorConfirmation.delete({
  //     //     where: { id: twoFactorConfirmation.id },
  //     //   });
  //     // }

  //     return true;
  //   },
  //   async session({ token, session }) {
  //     if (token.sub && session.user) {
  //       session.user.id = token.sub;
  //     }

  //     if (token.role && session.user) {
  //       session.user.role = token.role as UserRole;
  //     }

  //     if (session.user) {
  //       session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
  //     }

  //     if (session.user) {
  //       session.user.name = token.name;
  //       session.user.email = token.email!;
  //       session.user.image = token.image as null | string;
  //       session.user.isOAuth = token.isOAuth as boolean;
  //     }

  //     return session;
  //   },
  //   async jwt({ token }) {
  //     if (!token.sub) return token;

  //     const existingUser = await getUserById(token.sub);

  //     if (!existingUser) return token;

  //     const existingAccount = await getAccountByUserId(existingUser.id);

  //     token.isOAuth = !!existingAccount;
  //     token.name = existingUser.name;
  //     token.email = existingUser.email;
  //     token.role = existingUser.role;
  //     token.image = existingUser.image;
  //     token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

  //     return token;
  //   },
  // },
  adapter: DrizzleAdapter(db, {
    usersTable: schema.user,
    sessionsTable: schema.sessions,
    accountsTable: schema.account,
    verificationTokensTable: schema.verificationToken,
  }),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
});
