import { mail } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function GET() {
  const mailer = await mail();

  await mailer.sendMail({
    to: "cesare212@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",
  });

  return NextResponse.json({ success: true });
}
