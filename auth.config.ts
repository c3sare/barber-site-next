import NextAuth from "next-auth";

import db from "@/lib/drizzle";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getAccountByUserId } from "./actions/auth/getAccountByUserId";
import * as schema from "./drizzle/schema";

import { user } from "./drizzle/schema";
import { eq } from "drizzle-orm";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./validators/loginSchema";
import bcrypt from "bcrypt-edge";
import * as z from "zod/mini";
import { getUserByEmail } from "./actions/auth/getUserByEmail";
import { getUserById } from "./actions/auth/getUserById";

type UserRole = (typeof user.$inferSelect)["role"];

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: schema.user,
    sessionsTable: schema.sessions,
    accountsTable: schema.account,
    verificationTokensTable: schema.verificationToken,
  }),
  session: { strategy: "jwt" },
  pages: { signIn: "/login", error: "/login" },
  events: {
    async linkAccount({ user: userLink }) {
      await db
        .update(user)
        .set({ emailVerified: new Date() })
        .where(eq(user.id, userLink.id!));
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);

      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.image = token.image as null | string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.image = existingUser.image;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  trustHost: true,
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
        const validatedFields = z
          .extend(
            loginSchema,
            z.object({ callbackUrl: z.nullable(z.optional(z.string())) })
          )
          .safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return null;
          }

          const passwordsMatch = bcrypt.compareSync(password, user.password);

          if (passwordsMatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
});
