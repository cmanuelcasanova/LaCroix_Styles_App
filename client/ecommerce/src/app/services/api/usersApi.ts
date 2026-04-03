import { baseApi } from "./baseApi";
import { AuthResponse, LoginData, RegisterData, RecoveryData, RecoveryDataNew } from './queryTypes';


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
    
    recoverypass: builder.mutation<AuthResponse, RecoveryData >({
      query: ( data) => ({
        url: "/auth/recoverypass",
        method: "POST",
        body: data,
      }),
    }),

    recoverypass_new: builder.mutation<AuthResponse, RecoveryDataNew >({
      query: ( data) => ({
        url: "/auth/updateuser",
        method: "POST",
        body: data,
      }),
    }),

    verifyEmail: builder.mutation<void, {token:string} >({
      query: ( {token}) => ({
        url: "/auth/verifyEmail",
        method: "POST",
        body: {token},
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
  useLogoutMutation,
  useRecoverypassMutation,
  useRecoverypass_newMutation,
  useVerifyEmailMutation
} = usersApi;

/*
const response = await login(data).unwrap();
dispatch(setUser(response.user)); // si quieres guardarlo en Redux

*/  
