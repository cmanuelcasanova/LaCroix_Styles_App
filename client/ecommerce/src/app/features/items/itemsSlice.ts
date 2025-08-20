import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "./itemsTypes";

interface ItemsState {
  list: Item[];
}

const initialState: ItemsState = {
  list: [
    
    {
      id: "1",
  name: "Vestido Azul Marino",
  category: "Vestido Dama",
  price: 30,
  talla: "L",
  photo: "https://ik.imagekit.io/wakm0y68u/LaCroix/Lacroix_img_1.jpg"

  },

      {
      id: "2",
  name: "Vestido Azul Claro",
  category: "Vestido Dama",
  price: 25,
  talla: "S",
  photo: "https://ik.imagekit.io/wakm0y68u/LaCroix/Lacroix_img_4.jpg"

  },

      {
      id: "3",
  name: "Conjunto Deportivo",
  category: "Conjuntos Dama",
  price: 40,
  talla: "L",
  photo: "https://ik.imagekit.io/wakm0y68u/LaCroix/Lacroix_img_3.jpg"

  }




],
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.list.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.list = action.payload;
    },
    clearItems: (state) => {
      state.list = [];
    },
  },
});

export const { addItem, removeItem, setItems, clearItems } = itemsSlice.actions;
export default itemsSlice.reducer;