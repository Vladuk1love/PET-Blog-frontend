import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPosts, IAuthorsPosts } from "../schemaTypes";
import { setAuthHeader } from "../utils/setHeaders";

export const postsApi = createApi({
  reducerPath: "api/posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:4444/",
    prepareHeaders: setAuthHeader,
  }),
  endpoints: (build) => ({
    getPosts: build.query<IPosts[], number>({
      query: (page) => `posts?page=${page}`,
    }),
    getPost: build.query<IPosts, string>({
      query: (id) => `posts/certain?id=${id}`,
    }),
    getPostsCount: build.query<number, string>({
      query: (authorId) =>
        authorId ? `posts/count?authorId=${authorId}` : `posts/count`,
    }),
    getPopularPosts: build.query<IPosts[], string>({
      query: () => "posts/popular",
    }),
    getByAuthor: build.query<IPosts[], IAuthorsPosts>({
      query: ({ authorId, page }) => `posts/author/${authorId}?page=${page}`,
    }),
    createPost: build.mutation<string, Omit<IPosts, '_id' | 'viewsCount'|'user'>>({
      query: (data) => ({
        url: "/posts/certain",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
export const { useGetPopularPostsQuery } = postsApi;
export const { useGetPostsCountQuery } = postsApi;
export const { useGetByAuthorQuery } = postsApi;
export const { useCreatePostMutation } = postsApi;
export const { useGetPostQuery } = postsApi;
