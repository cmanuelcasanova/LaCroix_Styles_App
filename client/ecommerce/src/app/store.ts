import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from './services/api/baseApi'; 
import itemsReducer from "@/app/features/items/itemsSlice"
import CarsReducer from "@/app/features/Car/CarSlice"
import authReducer from "@/app/features/auth/authSlice"
import ThemeReducer from "@/app/features/theme/themeSlice"
import FilterSlice from "../app/features/filter/FilterSlice"
import SeletedFilterSlice from "@/app/features/selectedFilter/selectedFilterSlice"




export const store = configureStore({
  reducer: {
    items: itemsReducer,
    itemsCarrito: CarsReducer,
    theme: ThemeReducer,
    auth: authReducer,
    filter: FilterSlice,
    SelectedFilters: SeletedFilterSlice,
    [baseApi.reducerPath]: baseApi.reducer

  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
     devTools: process.env.NODE_ENV !== 'production', 



});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
