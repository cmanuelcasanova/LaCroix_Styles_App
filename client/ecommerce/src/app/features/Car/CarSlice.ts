import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Car } from "../Car/CarTypes";

interface CarsState {
  list: Car[];
}

const initialState: CarsState = {
  list: [],
};


export const CarSlice = createSlice({
  name: "Cars",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Car>) => {
      state.list.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    clearItems: (state) => {
      state.list = [];
    },
    updateItem: (state, action: PayloadAction<{ id: string; cant: number; precio: number }>) => {
      const { id, cant, precio } = action.payload;
      const item = state.list.find((item) => item.id === id);
      if (item) {
        
        item.cant = cant; ;
        item.precio = precio;
      }
    },
  },
});

export const { addItem, removeItem, clearItems, updateItem } =
  CarSlice.actions;
export default CarSlice.reducer;
