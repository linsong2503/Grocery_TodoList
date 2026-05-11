import { setPurchasedItem, updateItemQuantity } from "@/lib/server/db-actions";

export async function PATCH(req:Request,{id}:{id:string}) {
  try {
    const body = await req.json();
    const item = body.quantity
      ? await updateItemQuantity(id, body.quantity)
      : await setPurchasedItem(id, body.purchased ?? true);
    
    if (!item) {
      return Response.json({ error: "Item not found" }, { status: 404 });
    }
    return Response.json({ item }, { status: 200 });
    
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error updating item";
    return Response.json({ error: message }, { status: 400 });
  }
}