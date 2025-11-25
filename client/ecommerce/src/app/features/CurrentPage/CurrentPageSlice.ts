import { createSlice ,PayloadAction} from '@reduxjs/toolkit';

interface Pages {
    page: number
}

const initialState: Pages = {
  page: 0
};


export const CurrentPage = createSlice({
  name: 'CurrentPage',
  initialState,
  reducers: {

    Set_Page: (state, action: PayloadAction<number>) =>{
      state.page=action.payload
    },
    Next_Page: (state) => {
      state.page=state.page += 1;
    },
    Prev_Page: (state) => {
       if (state.page > 0) state.page -= 1;
    },
    Reset_Page: (state) => {
       state.page = 0;
    }


   
    
  },
});


export const { Next_Page, Prev_Page, Reset_Page, Set_Page} = CurrentPage.actions;
export default CurrentPage.reducer;
