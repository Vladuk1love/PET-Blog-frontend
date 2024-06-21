import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IPosts} from "../schemaTypes";

export const postsApi = createApi({
  reducerPath: 'api/posts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:4444/'
  }),
  endpoints:  (build) => ({
    getPosts: build.query<IPosts[], any>({
      query: () => 'posts'
    }),
    getPopularPosts: build.query<IPosts[],string> ({
      query: () => 'posts/popular'
    })
  })
})

export const { useGetPostsQuery } = postsApi
export const { useGetPopularPostsQuery } = postsApi