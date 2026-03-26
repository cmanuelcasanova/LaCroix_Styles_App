import { baseApi } from "@/app/services/api/baseApi";
import {
  qdata,
  SecData,
  product,
  qdataUpdate,
  UploadImagesBD,
  DownloadImagesBD,
} from "./queryTypes";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<product[], void>({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_SUPABASE_PATH}/rest/v1/Products?select=*,Seccion:Seccions(id, name),Tallas:Tallas(id, name),product_images(imageurl, order).order(order.asc)`.replace(
          /\s/g,
          "",
        ),
        method: "GET",
        credentials: "omit",
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Product"],
    }),

    getItem: builder.query<product, { id: string }>({
      query: ({ id }) => ({
        url: `${process.env.NEXT_PUBLIC_SUPABASE_PATH}/rest/v1/Products?id=eq.${id}&select=*,Tallas:Tallas(id, name),product_images(imageurl, order).order(order.asc)`.replace(
          /\s/g,
          "",
        ),
        method: "GET",
        credentials: "omit",
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: product[]) => response[0],
      providesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),

    getSeccion: builder.query<SecData[], void>({
      query: () => "/products/seccion",
      providesTags: ["Seccion"],
    }),
    addItem: builder.mutation<void, qdata>({
      query: (newItem) => ({
        url: "/products",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<void, qdataUpdate>({
      query: (newItem) => ({
        url: `/products`,
        method: "PUT",
        body: { ...newItem },
      }),
      invalidatesTags: ["Product"],
    }),
    removeItem: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    upLoadphoto: builder.mutation<DownloadImagesBD[], UploadImagesBD[]>({
      query: (data) => {
        const formData = new FormData();
        data.map((i) => {
          if (i.fileImagen) formData.append(`Image-${i.order}`, i.fileImagen);
        });

        return {
          url: "/auth/upload_image",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),

    deletePhoto: builder.mutation<
      void,
      { name: string | undefined; id: number }
    >({
      query: ({ name, id }) => {
        return {
          url: `/auth/delete_image?filePath=${name}&id=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Product"],
    }),

    updatePhoto: builder.mutation<
      void,
      { id: number; order: number; productId: number }
    >({
      query: ({ id, order, productId }) => {
        return {
          url: `/auth/update_image`,
          method: "PUT",
          body: { id: id, order: order, productId: productId },
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useAddItemMutation,
  useUpdateProductMutation,
  useRemoveItemMutation,
  useDeletePhotoMutation,
  useUpLoadphotoMutation,
  useUpdatePhotoMutation,
  useGetSeccionQuery,
  useGetItemQuery,
} = productsApi;
