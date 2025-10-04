import { baseApi } from "./baseApi";
import { ImagesBD } from './queryTypes';


export const fileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHomeImages: builder.query<ImagesBD[],void>({
      query: () => `/auth/homeslice`,
      providesTags: ["fileApi"],
    }),

  }),
});


export const {
useGetHomeImagesQuery

} = fileApi;


