import { RootState } from "@/app/store";

export const selectAuth = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUsername = (state: RootState) => state.auth.username;
export const selectRole = (state: RootState) => state.auth.role;

/*
const isAuth = useSelector(selectIsAuthenticated);
const user = useSelector(selectUser);
*/
