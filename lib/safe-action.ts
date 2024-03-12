import { auth } from "@/auth";
import { DEFAULT_SERVER_ERROR, createSafeActionClient } from "next-safe-action";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";
import { headers } from "next/headers";

export class ServerActionErrorClient extends Error {
  constructor(message: string) {
    super(message);
  }
}

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "120s"),
});

function handleReturnedServerError(e: Error) {
  if (e instanceof ServerActionErrorClient) {
    return e.message;
  }

  return DEFAULT_SERVER_ERROR;
}

async function rateLimiter() {
  const ip = headers().get("x-forwarded-for");

  const { success } = await rateLimit.limit(ip!);

  if (!success) throw new ServerActionErrorClient("Request limit reached");
}

export const action = createSafeActionClient({
  handleReturnedServerError,
  async middleware() {
    await rateLimiter();
  },
});

export const actionWithAuth = createSafeActionClient({
  handleReturnedServerError,
  async middleware() {
    await rateLimiter();

    const session = await auth();

    if (!session?.user.id)
      throw new ServerActionErrorClient("User isn't authorized!");

    return { session };
  },
});
