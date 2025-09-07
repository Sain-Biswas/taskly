import { organizationSchema } from "@/server/database/index.schema";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const projectSchema = pgTable("project", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organizationSchema.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(
    () => /* @__PURE__ */ new Date()
  ),
});
