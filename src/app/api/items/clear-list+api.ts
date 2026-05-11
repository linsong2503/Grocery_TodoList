import { clearPurchasedItems } from "@/lib/server/db-actions";

export async function POST() {
  try {
    await clearPurchasedItems();
    return Response.json({ success: true });
  } catch{
    Response.json({ error: "Something went wrong" }, { status: 400 });
  }
}