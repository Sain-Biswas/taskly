import { organizationSchema, userSchema } from "@/server/database/index.schema";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const invitationSchema = pgTable("invitation", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organizationSchema.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  role: text("role"),
  teamId: text("team_id"),
  status: text("status").default("pending").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  inviterId: text("inviter_id")
    .notNull()
    .references(() => userSchema.id, { onDelete: "cascade" }),
});
