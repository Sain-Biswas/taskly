import "server-only";

import { env } from "@/constant/environment-variables/server.env";
import { createTransport } from "nodemailer";

export const transporter = createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: env.GOOGLE_CLIENT_EMAIL,
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    refreshToken: env.GOOGLE_REFRESH_TOKEN,
  },
});
