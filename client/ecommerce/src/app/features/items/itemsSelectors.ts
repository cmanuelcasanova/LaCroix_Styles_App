import { RootState } from "@/app/store";

export const selectItems = (state: RootState) => state.items.total;
