import { z } from "zod";

const googleCaptchaResponseSchema = z.object({
  success: z.boolean(),
  hostname: z.string(),
});

export async function verifyCaptcha(captcha: string) {
  try {
    const request = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`
    );

    if (!request.ok) return false;

    const data = googleCaptchaResponseSchema.parse(await request.json());

    return data.success;
  } catch (err) {
    console.log(err);
    return false;
  }
}
