import { RootState } from "@/app/store";

export const selectItemsc = (state: RootState) => state.itemsCarrito.list;
export const selectItemById = (id: string) => (state: RootState) =>
  state.items.list.find((itemsCarrito) => itemsCarrito.id === id);
