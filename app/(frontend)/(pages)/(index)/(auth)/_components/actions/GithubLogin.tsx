"use server";

import { signIn } from "@/auth";

export const GithubLogin = async () => await signIn("github");
