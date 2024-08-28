import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from "../schemaTypes";


interface UserLocalState {
  isAuthenticated: boolean,
  user: null | IUser,
}

const initialState: UserLocalState = {
  isAuthenticated: false,
  user: null,
}

export const userSlice = createSlice({
  name: 'userLocalState',
  initialState,
  reducers: {
    loginState: (state, action:PayloadAction<IUser>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutState: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateState: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    }
  },
});

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions;
