import {configureStore} from "@reduxjs/toolkit";
import {postsApi} from "./posts/postsApi";
// import {userApi} from "./user/userApi";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(postsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>