import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "@/app/features/items/itemsSlice"
import CarsReducer from "@/app/features/Car/CarSlice"
import authReducer from "@/app/features/auth/authSlice"
import { baseApi } from './services/api/baseApi'; 



export const store = configureStore({
  reducer: {
    items: itemsReducer,
    itemsCarrito: CarsReducer,
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer

  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
     devTools: process.env.NODE_ENV !== 'production', 



});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
