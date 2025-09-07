import "server-only";

import { env } from "@/constant/environment-variables/server.env";
import { ac } from "@/server/auth/permission.auth";
import { database } from "@/server/database/index.database";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { organization, username } from "better-auth/plugins";

import {
  accountSchema,
  invitationSchema,
  memberSchema,
  organizationRoleSchema,
  organizationSchema,
  sessionSchema,
  userSchema,
  verificationSchema,
} from "@/server/database/index.schema";

export const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: "pg",
    schema: {
      user: userSchema,
      account: accountSchema,
      invitation: invitationSchema,
      member: memberSchema,
      organizationRole: organizationRoleSchema,
      organization: organizationSchema,
      session: sessionSchema,
      verification: verificationSchema,
    },
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
