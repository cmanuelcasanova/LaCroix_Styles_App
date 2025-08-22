import { RootState } from "@/app/store";

export const selectAuth = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

/*
const isAuth = useSelector(selectIsAuthenticated);
const user = useSelector(selectUser);
*/
