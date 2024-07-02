import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { loginSchema } from "@/validators/loginSchema";
import { getUserByEmail } from "@/data/user";

import type { NextAuthConfig } from "next-auth";
import { z } from "zod";

export default {
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
        const validatedFields = loginSchema
          .and(z.object({ callbackUrl: z.string().optional().nullable() }))
          .safeParse(credentials);

        if (validatedFields.success) {
          const { email, password, callbackUrl } = validatedFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
