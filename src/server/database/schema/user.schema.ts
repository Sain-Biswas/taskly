import { pgTable, text } from "drizzle-orm/pg-core";

export const userSchema = pgTable("user", {
  id: text("id").primaryKey(),
});
