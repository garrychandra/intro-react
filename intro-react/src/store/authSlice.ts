import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserInfo } from "../types";

export type AuthState = {
    userInfo?: UserInfo
    isLoading: boolean
}

const initialState: AuthState = {
    isLoading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo | undefined>) => {
        state.userInfo = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload
    }
  },
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer