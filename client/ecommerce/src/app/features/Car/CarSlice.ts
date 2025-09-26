import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Car } from "../Car/CarTypes";

interface CarsState {
  list: Car[];
}

const initialState: CarsState = {
  list: [],
};


export const CarSlice = createSlice({
  name: "Cars",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Car>) => {
      const repeat = state.list.some( item => (item.id === action.payload.id) )
      
      if(!repeat){ state.list.push(action.payload)
      }else{ 
          
        const item = state.list.find((item) => item.id === action.payload.id);
        if (item && action.payload.mode==='user') {
          item.cant = item.cant+1;
        }
      }
      
    },
   
  
    removeItem: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    clearItems: (state) => {
      state.list = [];
    },
    updateItem: (state, action: PayloadAction<{ id: string; cant: number; precio: number }>) => {
      const { id, cant, precio } = action.payload;
      const item = state.list.find((item) => item.id === id);
      if (item) {
        
        
        item.precio = precio;
        item.cant = cant; ;
      }
    },
  },
});

export const { addItem, removeItem, clearItems, updateItem } =
  CarSlice.actions;
export default CarSlice.reducer;
