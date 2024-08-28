import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, IUserLogin } from "../schemaTypes";
import { setAuthHeader } from "../utils/setHeaders";

export const userApi = createApi({
  reducerPath: "api/user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:4444/",
    prepareHeaders: setAuthHeader,
  }),
  endpoints: (build) => ({
    authUser: build.mutation<IUser, IUserLogin>({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    registerUser: build.mutation<IUser,Pick<IUser, "fullName" | "email" | "password">>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    authMe: build.query<IUser, any>({
      query: () => "auth/me",
    }),
    updateMe: build.mutation<IUser, Pick<IUser, 'avatarUrl'>>({
      query: (data) => ({
        url: "user/update",
        method: "PATCH",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useAuthUserMutation } = userApi;
export const { useAuthMeQuery } = userApi;
export const { useRegisterUserMutation } = userApi;
export const { useUpdateMeMutation } = userApi
