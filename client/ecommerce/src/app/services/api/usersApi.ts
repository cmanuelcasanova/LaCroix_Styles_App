import { baseApi } from "./baseApi";
import { AuthResponse, LoginData, RegisterData } from './queryTypes';


export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginData>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<AuthResponse, void>({
      query: (credentials) => ({
        url: "/auth/logout",
        method: "POST",
        body: credentials,
    }),
    }),
    registro: builder.mutation<AuthResponse, RegisterData>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    profile: builder.query<AuthResponse, void>({
      query: () => '/auth/profile',
        providesTags: ['User'],
       
    }),






  }),
});


export const {
  useLoginMutation,
  useRegistroMutation,
  useProfileQuery,
  useLazyProfileQuery,
  useLogoutMutation
} = usersApi;

/*
const response = await login(data).unwrap();
dispatch(setUser(response.user)); // si quieres guardarlo en Redux

*/  
