"use server";

import { signIn } from "@/auth.config";

export const GithubLogin = async () => await signIn("github");
