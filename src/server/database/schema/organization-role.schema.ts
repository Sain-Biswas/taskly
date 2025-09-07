import { organizationSchema } from "@/server/database/index.schema";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const organizationRoleSchema = pgTable("organization_role", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organizationSchema.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  permission: text("permission").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(
    () => /* @__PURE__ */ new Date()
  ),
});
