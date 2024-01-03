import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { RegisterSchema } from "./validators/RegisterSchema";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = RegisterSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await db.user.findUnique({
            where: {
              email,
            },
          });
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password ?? ""
          );

          if (passwordsMatch) return user;
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      //   const isLoggedIn = !!auth?.user;
      //   const isOnDashboard = nextUrl.pathname.startsWith("/");
      //   if (isOnDashboard) {
      //     if (isLoggedIn) return true;
      //     return false; // Redirect unauthenticated users to login page
      //   } else if (isLoggedIn) {
      //     return Response.redirect(new URL("/dashboard", nextUrl));
      //   }
      return true;
    },
  },
} satisfies NextAuthConfig;
