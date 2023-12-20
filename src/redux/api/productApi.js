import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = `https://fakestoreapi.com/`;

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    endpoints: (builder) => ({
        getProducts: builder.mutation({
            query: (params) => ({
                url: 'products',
                method: 'GET',
                params,
            }),
        }),
        getProductById: builder.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method:'GET',
            }),
        }),
        createProduct: builder.mutation({
            query: (id) => ({
                url: `products`,
                method:'POST',
            }),
        }),
        updateProduct: builder.mutation({
            query: ({id, body}) => ({
                url: `products/${id}`,
                method:'PUT',
                body,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method:'DELETE',
            }),
        }),
    }),
});

export const {
    useGetProductsMutation,
    useGetProductByIdMutation,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;
