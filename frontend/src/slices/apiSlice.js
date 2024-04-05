// Parent to our other API slices

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// So there is a 'createSlice' which you would use for regular slices that aren't dealing with asynchronous requests such as the cart.
// For instance, we'll have a cart slice, but since we're dealing with a back end API, we're going to bring in 'createApi', which works a little bit differently.
// And then we're also going to bring in 'fetchBaseQuery'.
//  fetchBaseQuery is the function that will allow us to make requests to our backend API.

import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Products', 'Orders', 'Users'],
    endpoints: (builder) => ({})
})