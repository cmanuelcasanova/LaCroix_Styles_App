import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { qdata } from "../api/queryTypes";
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }), // tu backend Express
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getItems: builder.query<qdata[], void>({
      query: () => '/products',
      providesTags: ['Product'],
    }),
    addItem: builder.mutation<void, qdata>({
      query: (newItem) => ({
        url: '/products',
        method: 'POST',
        body: newItem,
      }),
      invalidatesTags: ['Product'],
    }),
    updateItem: builder.mutation<void, { id: string; cant?: number; precio?: number }>({
      query: ({ id, ...patch }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Product'],
    }),
    removeItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useAddItemMutation,
  useUpdateItemMutation,
  useRemoveItemMutation,
} = api;