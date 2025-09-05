import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState } from "./selectedFilterType";


const initialState: FilterState = {
  category: [],
  color: [],
  talla: [],
  preciomin: 0,
  preciomax: 1000
};


export const SeletedFilterSlice = createSlice({
  name: "SelectedFilters",
  initialState,
  reducers: {
    addSelectFilters: (state, action: PayloadAction< {category?:string; color?:string; talla?: string}>) => {
      const { category , color , talla } = action.payload
      
      if (category && !state.category.includes(category)) state.category.push(category);
      if(color && !state.color.includes(color)) state.color.push(color)
      if(talla && !state.talla.includes(talla)) state.talla.push(talla)
    },

    deleteSelectFilters: (state, action: PayloadAction< { name: string; value:string }>) => {
      const { name , value } = action.payload
      
      if (name === "category" ) state.category = state.category.filter( item => item !== value);
      if (name === "talla" ) state.talla = state.talla.filter( item => item !== value);
      if (name === "color" ) state.color = state.color.filter( item => item !== value);

    },
    
  },
});

export const { addSelectFilters , deleteSelectFilters } =
  SeletedFilterSlice.actions;
export default SeletedFilterSlice.reducer;
