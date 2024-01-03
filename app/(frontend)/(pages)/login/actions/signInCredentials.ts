"use server";

import { signIn } from "@/auth";

type Data = {
  email: string;
  password: string;
};

export async function signInCredentials(formData: Data) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}
