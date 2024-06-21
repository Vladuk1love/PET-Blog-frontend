import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, IUserLogin } from "../schemaTypes";


export const userApi = createApi({
  reducerPath: 'api/posts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:4444/'
  }),
  endpoints: (build) => ({
    authUser: build.mutation<IUser, IUserLogin>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  })
})

export const { useAuthUserMutation} = userApi

// export const { useGetPostsQuery } = postsApi
// export const { useGetPopularPostsQuery } = postsApi