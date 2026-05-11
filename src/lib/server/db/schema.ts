import { bigint, boolean, text, integer, pgTable } from "drizzle-orm/pg-core";

export const grocery_items = pgTable("grocery_items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  quantity: integer("quantity").notNull().default(1),
  purchased: boolean("purchased").notNull().default(false),
  priority: text("priority").notNull().default("medium"),
  updated_at: bigint("updated_at", { mode: "number" }).notNull(),
  state: text("state").notNull().default("visible")
});

