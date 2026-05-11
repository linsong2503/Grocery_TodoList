import { createGroceryItem, getGroceryItems } from "@/lib/server/db-actions";

export async function GET(){
  try {
    const items = await getGroceryItems();
    
    return Response.json({items});
  } catch(error) {
    const message = error instanceof Error ? error.message : "Errors while retrieving items.";
    return Response.json({error:message},{status:500})
  }
};

export async function POST(req:Request){
  try {
    const { name, category, quantity, priority } = await req.json();
    
    if (!name||!category||!quantity||priority) {
      return Response.json({ error: "All fields are required!" }, { status: 400 });
    }
    
    const item = await createGroceryItem({name, category, quantity, priority});
    return Response.json({ item }, { status: 200 });
    
  } catch (error) {
    const message = error instanceof Error ? error.message : "Errors while creating item";
    return Response.json({ error: message }, { status: 500 });
  }
};

