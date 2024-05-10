"use server";

import { signOut as NextAuthSignOut } from "@/auth.config";

export const signOut = async () => {
	try {
		await NextAuthSignOut();
	} catch (err) {
		console.log(err);
	}
};
