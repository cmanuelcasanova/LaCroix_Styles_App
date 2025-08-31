import { baseApi } from "@/app/services/api/baseApi";
import { qdata, CatData , product } from "./queryTypes";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<product[], void>({
      query: () => "/products",
      providesTags: ["Product"],
    }),
    getItem: builder.query<product, {id:string}>({
      query: ({id}) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    getCategory: builder.query<CatData[], void>({
      query: () => "/products/category",
      providesTags: ["Product"],
    }),
    addItem: builder.mutation<void, qdata>({
      query: (newItem) => ({
        url: "/products",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: ["Product"],
    }),
    updateItem: builder.mutation <void,{ id: string; cant?: number; precio?: number }>({
      query: ({ id, ...patch }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Product"],
    }),
    removeItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    upLoadphoto: builder.mutation<{ url: string }, { image: File }>({
      query: ({ image }) => {
        const formData = new FormData();
        formData.append("image", image); 

        return {
          url: "/auth/upload",
          method: "POST",
          body: formData,
    
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useAddItemMutation,
  useUpdateItemMutation,
  useRemoveItemMutation,
  useUpLoadphotoMutation,
  useGetCategoryQuery,
  useGetItemQuery
} = productsApi;
