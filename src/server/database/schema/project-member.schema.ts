import { projectSchema, userSchema } from "@/server/database/index.schema";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const projectMemberSchema = pgTable("project_member", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projectSchema.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => userSchema.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at"),
});
