import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from "./authTypes";


const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  username: null
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      const { user, isAuthenticated, username} = action.payload;
      state.user = user;
      state.isAuthenticated = isAuthenticated;
      state.username= username;
    },
    logout: (state) => {
      state.user = null;
      state.username = null;
      state.isAuthenticated = false;
    },
  },
});


export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
