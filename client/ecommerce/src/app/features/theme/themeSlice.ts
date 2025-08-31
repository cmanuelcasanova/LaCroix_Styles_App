import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Themetype , ThemeState } from "../theme/themeTypes";

const initialState: ThemeState = {
  theme: Themetype.ALL
};


export const ThemeSlice = createSlice({
  name: "Theme",
  initialState,
  reducers: {

        setTheme: (state, action: PayloadAction<Themetype>) => {
          state.theme=action.payload;
        },

  },
});

export const { setTheme  } =
  ThemeSlice.actions;
export default ThemeSlice.reducer;