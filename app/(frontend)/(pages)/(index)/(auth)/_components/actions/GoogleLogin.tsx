"use server";

import { signIn } from "@/auth";

export const GoogleLogin = async () => await signIn("google");
