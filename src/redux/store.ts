import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./posts/postsApi";
import { userReducer } from "./user/userSlice";
import { userApi } from "./user/userApi";


export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      postsApi.middleware,
      userApi.middleware
    ])
})


export type RootState = ReturnType<typeof store.getState>

