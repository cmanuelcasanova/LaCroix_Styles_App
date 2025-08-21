import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "@/app/features/items/itemsSlice"
import CarsReducer from "@/app/features/Car/CarSlice"
import { api } from './features/api/apiSlice'; 



export const store = configureStore({
  reducer: {
    items: itemsReducer,
    itemsCarrito: CarsReducer,
    [api.reducerPath]: api.reducer,

  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
