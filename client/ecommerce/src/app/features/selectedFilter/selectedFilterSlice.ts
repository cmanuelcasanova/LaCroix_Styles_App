import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState } from "./selectedFilterType";


const initialState: FilterState = {
  category: [],
  color: [],
  talla: [],
  preciomin: 0,
  preciomax: 1000,
  search: ""
};


export const SeletedFilterSlice = createSlice({
  name: "SelectedFilters",
  initialState,
  reducers: {
    addSelectFilters: (state, action: PayloadAction< {category?:string; color?:string; talla?: string, preciomin?:number, preciomax?:number, search?:string }>) => {
      const { category , color , talla, preciomin, preciomax, search } = action.payload
      
      if (category && !state.category.includes(category)) state.category.push(category);
      if(color && !state.color.includes(color)) state.color.push(color)
      if(talla && !state.talla.includes(talla)) state.talla.push(talla)
      if(preciomin) state.preciomin= preciomin
      if(preciomax) state.preciomax= preciomax
      if(search || search==="") state.search = search
    },

    deleteSelectFilters: (state, action: PayloadAction< { name: string; value:string }>) => {
      const { name , value } = action.payload
      
      if (name === "category" ) state.category = state.category.filter( item => item !== value);
      if (name === "talla" ) state.talla = state.talla.filter( item => item !== value);
      if (name === "color" ) state.color = state.color.filter( item => item !== value);
      
    },

    clearSelectFilters: (state, action: PayloadAction< void >) => {
      
      state.category = [];
      state.talla = [];
      state.color = [];
      state.preciomin = 0;
      state.preciomax = 1000;
      state.search=""

    },

    
  },
});

export const { addSelectFilters , deleteSelectFilters , clearSelectFilters } =
  SeletedFilterSlice.actions;
export default SeletedFilterSlice.reducer;
