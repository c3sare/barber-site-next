import { auth } from "@/auth";
import { createSafeActionClient } from "next-safe-action";

export const action = createSafeActionClient();

export const actionWithAuth = createSafeActionClient({
  async middleware(parsedInput) {
    const session = await auth();

    if (!session?.user.id) throw new Error("User isn't authorized!");

    return { session };
  },
});
