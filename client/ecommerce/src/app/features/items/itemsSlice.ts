import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Items } from "./itemsTypes";

const initialState: Items = {
  total: 0
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<number>) => {
      state.total=action.payload;
    }
  },
});

export const { setItems} = itemsSlice.actions;
export default itemsSlice.reducer;