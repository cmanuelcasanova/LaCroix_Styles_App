import { baseApi } from "./baseApi";
import { ImagesBD, BrandSearchResult} from './queryTypes';


export const fileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHomeImages: builder.query<ImagesBD[],void>({
      
      
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_SUPABASE_PATH}/rest/v1/homeslice?select=* }` ,
        method: "GET",
        credentials: "omit",
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
      }),
      
      
      
      
      
      providesTags: ["HomeSlice"],
    }),


    getBrandInfo: builder.query<BrandSearchResult[], {query:string}>({
      query: ({query}) => ({
      url: `https://api.brandfetch.io/v2/search/${query}`,
      credentials: 'omit',
      method: 'GET',
      headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_BRAND_FETCH_API_KEY}`,
    },

    
    }),
     providesTags: ["BrandInfo"],
}),


  }),
});


export const {
useGetHomeImagesQuery,
useLazyGetBrandInfoQuery,
useGetBrandInfoQuery

} = fileApi;


