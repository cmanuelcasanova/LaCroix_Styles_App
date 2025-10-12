import { baseApi } from "./baseApi";
import { ImagesBD, BrandSearchResult} from './queryTypes';


export const fileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHomeImages: builder.query<ImagesBD[],void>({
      query: () => `/auth/homeslice`,
      providesTags: ["fileApi"],
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
}),


  }),
});


export const {
useGetHomeImagesQuery,
useLazyGetBrandInfoQuery,
useGetBrandInfoQuery

} = fileApi;


