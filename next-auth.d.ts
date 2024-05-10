import NextAuth, { type DefaultSession } from "next-auth";
import type { user } from "./drizzle/schema";

export type ExtendedUser = DefaultSession["user"] & {
	role: (typeof user.$inferSelect)["role"];
	isTwoFactorEnabled: boolean;
	isOAuth: boolean;
};

declare module "next-auth" {
	interface Session {
		user: ExtendedUser;
	}
}
