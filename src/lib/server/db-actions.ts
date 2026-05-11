import { desc, eq } from "drizzle-orm";
import { db } from "./db/client";
import { grocery_items } from "./db/schema";

export const getGroceryItems = async () => {
  const rows = await db.select().from(grocery_items)
    .orderBy(desc(grocery_items.updated_at))
    .where(eq(grocery_items.state, "visible"));
  return rows;
}

export const createGroceryItem = async (input: {
  name: string,
  category: string,
  quantity: number,
  priority: string
}) => {
  const row = await db.insert(grocery_items).values({
    id: crypto.randomUUID(),
    name: input.name,
    category: input.category,
    quantity: Math.max(1, input.quantity),
    purchased: false,
    priority: input.priority,
    updated_at: Date.now()
  }).returning();
  return row[0];
};

export const setPurchasedItem = async (id:string, purchased:boolean) => {
  const row = await db.update(grocery_items)
    .set({ purchased, updated_at: Date.now() })
    .where(eq(grocery_items.id, id))
    .returning();
  
  if (!row.length) {
    return null;
  }
  return row[0];
}

export const updateItemQuantity = async (id:string, quantity:number) => {
  const row = await db.update(grocery_items)
    .set({ quantity: Math.max(1, Math.floor(quantity)), updated_at: Date.now() })
    .where(eq(grocery_items.id, id))
    .returning();
  
  if (!row.length) {
    return null;
  }
  return row[0];
}

export const deleteGroceryItem = async (id: string) => {
  const row = await db.update(grocery_items)
    .set({ state: "invisible", updated_at: Date.now() })
    .where(eq(grocery_items.id, id))
    .returning();
  
  if (!row.length) {
    return null;
  }
  return row[0];
}

export const clearPurchasedItems = async () => {
  await db.update(grocery_items)
    .set({ state: "invisible" })
    .where(eq(grocery_items.purchased, true));
}


