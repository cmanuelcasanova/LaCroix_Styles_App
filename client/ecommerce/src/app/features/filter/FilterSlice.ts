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
      if (action.payload.category.length>0) state.category=  action.payload.category.sort((a, b) => a.name.localeCompare(b.name))
      if (action.payload.color.length>0)  state.color = action.payload.color.sort((a, b) => a.name.localeCompare(b.name))
      if (action.payload.talla.length>0) state.talla = action.payload.talla.sort((a, b) => a.name.localeCompare(b.name))
    },
    
  },
});

export const { addFilters } =
  FilterSlice.actions;
export default FilterSlice.reducer;
