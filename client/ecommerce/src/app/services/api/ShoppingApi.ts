import { baseApi } from "./baseApi";
import { ShoppingData } from './queryTypes';


export const shoppingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllItemsCar: builder.query<void,void>({
      query: () => `/auth/shopping`,
      providesTags: ["Shopping"],
    }),

    getItemsCar: builder.query<void, {id:string}>({
      query: ({id}) => `/auth/shopping/${id}`,
      providesTags: ["Shopping"],
    }),

    createItemCar: builder.mutation<void, ShoppingData>({
      query: (credentials) => ({
        url: "/auth/shopping",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Shopping"],
    }),



  }),
});


export const {
 useCreateItemCarMutation,
 useGetAllItemsCarQuery,
 useGetItemsCarQuery

} = shoppingApi;


