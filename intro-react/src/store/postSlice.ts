import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PostListResponse } from "../types";

export type PostState = {
    posts?: PostListResponse
    isLoading: boolean
}

const initialState: PostState = {
    isLoading: false
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostListResponse | undefined>) => {
        state.posts = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload
    }
  },
})

export const postActions = postSlice.actions
export const postReducer = postSlice.reducer