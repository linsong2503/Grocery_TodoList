import { create } from "zustand";

export type Category = "Produce" | "Dairy" | "Bakery" | "Pantry" | "Snack" | "Food";
export type Priority = "Low" | "Medium" | "High";

export type GroceryItem = {
  id: string,
  name: string,
  category: Category,
  quantity: number,
  purchased: boolean,
  priority: Priority
};

export type CreateInput = {
  name: string,
  category: Category,
  quantity: number,
  priority: Priority
}

type Items = { items: GroceryItem[] };
type Item = { item: GroceryItem };

type GroceryStore = {
  items: GroceryItem[],
  isLoading: boolean,
  error: string | null,
  loadItems: () => Promise<void>,
  addItem: (input: CreateInput) => Promise<GroceryItem|void>,
  updateQuantity: (id: string, quantity: number) => Promise<void>,
  togglePurchased: (id: string) => Promise<void>,
  deleteItem: (id: string) => Promise<void>,
  clearPurchasedList: ()=>Promise<void>
}

export const useStore = create<GroceryStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,
  loadItems: async () => {
    set({isLoading:true,error:null})
    try {
      const res = await fetch("/api/items");
      const payload = (await res.json()) as Items;
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      set({ items: payload.items });
    } catch(error) {
      console.log("Error retrieving items", error);
      set({ error: "Something went wrong!" });
    } finally {
      set({isLoading:false})
    }
  },
  addItem: async (input) => { 
    set({ error: null });
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: input.name,
          category: input.category,
          quantity: Math.max(1,input.quantity),
          priority: input.priority
        }),
      });
      const payload = (await res.json()) as Item;
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      set((state) => ({ items: [payload.item, ...state.items] }));
      return payload.item;
    } catch(error) {
      console.log("Error creating item", error);
      set({ error: "Something went wrong!" });
    } 
  },
  updateQuantity: async (id, quantity) => {
    const nextQuantity = Math.max(1, quantity);
    set({ error: null });
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: nextQuantity })
      });
      const payload = (await res.json()) as Item;
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      set((state) => ({
        items: state.items.map((item) => (item.id === id ? payload.item : item))
      }));
    } catch (error) {
      console.log("Error updating item", error);
      set({ error: "Something went wrong!" });
    }
  },
  togglePurchased: async (id) => {
    set({ error: null });
    const currentItem = get().items.find((item) => item.id === id);
    if (!currentItem) return;
    const nextPurchased = !currentItem.purchased;
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchased: nextPurchased })
      });

      const payload = (await res.json()) as Item;
      set((state) => ({
        items: state.items.map((item) => item.id === id ? payload.item : item)
      }));
    } catch(error) {
      console.log("Error toggling purchased item", error);
      set({ error: "Something went wrong" });
    }
  },
  deleteItem: async (id) => { 
    set({ error: null });
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "PUT",
      })
      if (!res.ok) throw new Error(`Request failed ${res.status}`);
      set((state) => ({ items: state.items.filter((item) => item.id != id) }));
    } catch(error) {
      console.log("Error deleting item", error);
      set({ error: "Something went wrong" });
    }
  },
  clearPurchasedList: async () => {
    set({ error: null });
    try {
      const res = await fetch(`/api/items/clear-list`, {
        method: "POST",
      })
      if (!res.ok) throw new Error(`Request failed ${res.status}`);
      const items= get().items.filter((item) => !item.purchased);
      set({ items });
    } catch(error) {
      console.log("Error clearing purchased items", error);
      set({ error: "Something went wrong" });
    }
  }
  }));
