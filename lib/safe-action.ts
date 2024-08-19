import { auth } from "@/auth.config";
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from "next-safe-action";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";
import { headers } from "next/headers";
import db from "./drizzle";

export class ServerActionErrorClient extends Error {
  constructor(message: string) {
    super(message);
  }
}

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "60s"),
});

function handleReturnedServerError(e: Error) {
  if (e instanceof ServerActionErrorClient) {
    return e.message;
  }

  return DEFAULT_SERVER_ERROR_MESSAGE;
}

async function rateLimiter() {
  const ip = headers().get("x-forwarded-for");

  const { success } = await rateLimit.limit(ip!);

  if (!success && process.env.NODE_ENV === "production")
    throw new ServerActionErrorClient("Request limit reached");
}

export const action = createSafeActionClient({
  handleReturnedServerError,
}).use(async ({ next }) => {
  await rateLimiter();

  return next({ ctx: {} });
});

export const actionWithAuth = createSafeActionClient({
  handleReturnedServerError,
}).use(async ({ next }) => {
  await rateLimiter();

  const session = await auth();

  if (!session?.user.id)
    throw new ServerActionErrorClient("User isn't authorized!");

  return next({ ctx: session });
});

export const adminAction = createSafeActionClient().use(async ({ next }) => {
  const session = await auth();

  if (!session?.user.id || session?.user.role !== "ADMIN")
    throw new ServerActionErrorClient("User isn't authorized!");

  const user = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.id, session.user.id!),
  });

  if (!user || user.role !== "ADMIN")
    throw new ServerActionErrorClient("User isn't authorized!");

  return next({ ctx: user });
});
