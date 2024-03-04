import nodemailer, { TransportOptions } from "nodemailer";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.NODEMAILER_CLIENT_ID,
  process.env.NODEMAILER_CLIENT_SECRET,
  process.env.NODEMAILER_REDIRECT_URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.NODEMAILER_REFRESH_TOKEN,
});

export const mail = async () => {
  const accessToken = await oauth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: "gmail",
    host: process.env.NODEMAILER_HOST as string,
    port: Number(process.env.NODEMAILER_PORT),
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.NODEMAILER_MAIL,
      clientId: process.env.NODEMAILER_CLIENT_ID,
      clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
      refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
      accessToken,
    },
  } as TransportOptions);
};
