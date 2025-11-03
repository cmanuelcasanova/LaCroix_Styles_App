import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include', 
  }),
  tagTypes: ['Product', 'User','Shopping', 'fileApi'],
  endpoints: () => ({}),
  //keepUnusedDataFor: process.env.NODE_ENV === 'development' ? 0 : 60,

});

