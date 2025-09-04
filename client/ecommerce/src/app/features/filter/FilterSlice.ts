import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface FilterState {
  category: string[];
  color: string[];
  talla: string[];
}

const initialState: FilterState = {
  category: [],
  color: [],
  talla: []
};


export const FilterSlice = createSlice({
  name: "Filters",
  initialState,
  reducers: {
    addFilters: (state, action: PayloadAction< {category: string[]; color: string[]; talla: string[] }>) => {
      state.category = action.payload.category;
      state.color = action.payload.color
      state.talla = action.payload.talla
    },
    
  },
});

export const { addFilters } =
  FilterSlice.actions;
export default FilterSlice.reducer;
