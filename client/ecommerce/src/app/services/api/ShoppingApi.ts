import { baseApi } from "./baseApi";
import { ShoppingData, ShoppingDataQuery } from './queryTypes';


export const shoppingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllItemsCar: builder.query<ShoppingDataQuery[],void>({
      query: () => `/auth/shopping`,
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
    deleteItemCar: builder.mutation<void, {productId:number}>({
      query: ({productId}) => ({
        url: `/auth/shopping/${productId}`,
        method: "DELETE",
        
      }),
      invalidatesTags: ["Shopping"],
    }),



  }),
});


export const {
 useCreateItemCarMutation,
 useGetAllItemsCarQuery,
 useDeleteItemCarMutation

} = shoppingApi;


