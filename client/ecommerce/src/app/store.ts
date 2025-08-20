import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "@/app/features/items/itemsSlice"
import CarsReducer from "@/app/features/Car/CarSlice"


export const store = configureStore({
  reducer: {
    items: itemsReducer,
    itemsCarrito: CarsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
