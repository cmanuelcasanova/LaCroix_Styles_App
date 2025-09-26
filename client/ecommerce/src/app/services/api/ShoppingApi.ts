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
    deleteItemCar: builder.mutation<void, {productId:number,talla:string}>({
      query: ({productId, talla}) => ({
        url: `/auth/shopping/${productId}`,
        method: "DELETE",
         body: {talla},
        
      }),
      invalidatesTags: ["Shopping"],
    }),
    
    UpdateItemCar: builder.mutation<void, {productId:number, talla:string, tipo: string }>({
      query: ({productId , tipo, talla}) => ({
        url: `/auth/shopping/${productId}`,
        method: "PATCH",
        body: {tipo,talla},
      }),
      invalidatesTags: ["Shopping"],
    }),


  }),
});


export const {
 useCreateItemCarMutation,
 useGetAllItemsCarQuery,
 useDeleteItemCarMutation,
 useUpdateItemCarMutation

} = shoppingApi;


