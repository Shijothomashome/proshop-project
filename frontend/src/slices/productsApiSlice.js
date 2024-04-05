import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL, UPLOADS_URL } from "../constants";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL,
        params: {
          keyword,
          pageNumber,
        },
      }),
      providesTags: ["Products"],
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      // creates a sample product in the backend without any data from frontend and then user can edit it. That's why here no body is used.
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Products"], // when create new product button is clicked from the ProductListScreen, the "Products" cache is cleared (invalidated) and when the refetch() called from the handler function of create Product button, the latest data is being stored in the "Products" cache
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"], // clears the old cache allowing fresh data to be fetched
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOADS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
} = productsApiSlice;

/**
 * 
**Cache Management in Web Applications: Understanding providesTags and invalidatesTags in the context of a Redux toolkit's apiSlice**

In the realm of web development, efficient data management is crucial for delivering a seamless user experience. One significant aspect of this is caching, where data fetched from APIs or databases is stored locally to enhance performance. Two important concepts in cache management are `providesTags` and `invalidatesTags`. Let's delve into these concepts and understand their significance:

**providesTags: ['Products']**

When fetching data from an API, it's essential to associate that data with relevant cache tags. This is where `providesTags` comes into play. In the scenario of retrieving a list of products from an API, specifying `providesTags: ['Product']` ensures that the fetched product data is associated with the cache tag `'Product'`. Consequently, this data is stored in the cache under the specified tag.

**invalidatesTags: ['Products']**

Imagine a scenario where a user adds a new product to the list displayed in your web application. After successfully adding the product, it's imperative to update the cached product data to reflect this change. This is where `invalidatesTags` proves its significance. By setting `invalidatesTags: ['Product']` in the mutation configuration associated with adding a new product, you instruct the cache system to invalidate any cached data associated with the `'Product'` tag. In essence, the cache is cleared or updated to ensure that the latest changes are reflected.

IMP Meaning -- When you invalidate cached data, you're saying that the data in the cache is no longer valid or accurate. It's like saying, "This information is old, don't rely on it anymore." So, it will be removed from the cache, allowing fresh data to be fetched when needed.

      */
