import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState , filteritem } from "./FilterTypes";


const initialState: FilterState = {
  category: [],
  color: [],
  talla: [],

};


export const FilterSlice = createSlice({
  name: "Filters",
  initialState,
  reducers: {
    addFilters: (state, action: PayloadAction< {category:filteritem[]; color:filteritem[]; talla: filteritem[] }>) => {
      state.category = action.payload.category;
      state.color = action.payload.color
      state.talla = action.payload.talla
    },
    
  },
});

export const { addFilters } =
  FilterSlice.actions;
export default FilterSlice.reducer;
