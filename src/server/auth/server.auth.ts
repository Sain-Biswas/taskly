import "server-only";

import { env } from "@/constant/environment-variables/server.env";
import { ac } from "@/server/auth/permission.auth";
import { database } from "@/server/database/index.database";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { organization, username } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
    username({
      minUsernameLength: 3,
      maxUsernameLength: 100,
    }),
    organization({
      teams: {
        enabled: true,
        allowRemovingAllTeams: true,
      },
      ac,
      dynamicAccessControl: {
        enabled: true,
      },
    }),
  ],
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
});
