import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState ,user } from "./authTypes";


const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<user>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});


export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
