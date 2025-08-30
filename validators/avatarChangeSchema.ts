import * as z from "zod/mini";

export const avatarChangeSchema = z.pipe(
  z.unknown().check(z.refine((val) => val instanceof FormData)),
  z.transform((val: FormData) => Object.fromEntries(val))
);
