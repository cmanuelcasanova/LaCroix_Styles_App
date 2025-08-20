import { RootState } from "@/app/store";

export const selectItems = (state: RootState) => state.items.list;
export const selectItemById = (id: string) => (state: RootState) =>
  state.items.list.find((item) => item.id === id);
