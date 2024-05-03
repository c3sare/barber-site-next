"use server";

import { signIn } from "@/auth.config";

export const GoogleLogin = async () => await signIn("google");
