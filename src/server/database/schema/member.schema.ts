import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { organizationSchema, userSchema } from "@/server/database/index.schema";

export const memberSchema = pgTable("member", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organizationSchema.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => userSchema.id, { onDelete: "cascade" }),
  role: text("role").default("member").notNull(),
  createdAt: timestamp("created_at").notNull(),
});
