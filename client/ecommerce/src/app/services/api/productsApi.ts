import { baseApi } from "@/app/services/api/baseApi";
import { qdata, SecData , product, qdataUpdate, UploadImagesBD, DownloadImagesBD} from "./queryTypes";

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
    getSeccion: builder.query<SecData[], void>({
      query: () => "/products/seccion",
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
    updateProduct: builder.mutation <void, qdataUpdate >({
      query: (newItem) => ({
        url: `/products`,
        method: "PUT",
        body: {...newItem},
      }),
      invalidatesTags: ["Product"],
    }),
    removeItem: builder.mutation<void,{ id: number }>({
      query: ({id}) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    upLoadphoto: builder.mutation<DownloadImagesBD[], UploadImagesBD[]>({
      query: ( data ) => {
        const formData = new FormData();
        data.map( i =>  { 
          if(i.fileImagen) formData.append(`Image-${i.order}`, i.fileImagen)
        }) ;  
        
        return {
          url: "/auth/upload",
          method: "POST",
          body: formData,
    
        };
      },
      invalidatesTags: ["Product"],
    }),

    deletePhoto: builder.mutation<void, { name: string | undefined }>({
      query: ({ name }) => {
        return {
          url: `/auth/delete?filePath=${name} `,
          method: "DELETE",
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
  useGetSeccionQuery,
  useGetItemQuery
  
} = productsApi;
