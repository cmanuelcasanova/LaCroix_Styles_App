import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState , filteritem } from "./FilterTypes";


const initialState: FilterState = {
  category: [],
  color: [],
  talla: [],
  price_min: 0,
  price_max: 1000

};


export const FilterSlice = createSlice({
  name: "Filters",
  initialState,
  reducers: {
    addFilters: (state, action: PayloadAction< {category:filteritem[]; color:filteritem[]; talla: filteritem[],price_min:number, price_max:number }>) => {
      state.category = action.payload.category;
      state.color = action.payload.color
      state.talla = action.payload.talla
      state.price_min = action.payload.price_min
      state.price_max = action.payload.price_max
    },
    
  },
});

export const { addFilters } =
  FilterSlice.actions;
export default FilterSlice.reducer;
