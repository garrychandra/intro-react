import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AsyncDataState, PostListResponse  } from "../types";

export type PostState = {
    posts?: PostListResponse
    dataState?: AsyncDataState
}

const initialState: PostState = {
    dataState: 'pending'
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostListResponse | undefined>) => {
        state.posts = action.payload
    },
    setDataState: (state, action: PayloadAction<AsyncDataState>) => {
        state.dataState = action.payload
    }
  },
})

export const postActions = postSlice.actions
export const postReducer = postSlice.reducer