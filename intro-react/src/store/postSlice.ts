import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AsyncDataState, PostListResponse  } from "../types";

export type PostState = {
    posts?: PostListResponse
    dataState?: AsyncDataState
}

const initialState: PostState = {
    dataState: 'pending'
}

export const reloadPosts = createAsyncThunk(
    'post/reloadPosts',
    async () => {
      const result = await fetch('api/posts');
      if (!result.ok) {
        throw new Error('Failed to fetch posts');
      }
      return (await result.json()) as PostListResponse;
    });

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
  extraReducers: (builder) => {
    builder.addCase(reloadPosts.pending, (state) => {
      state.dataState = 'loading';
    });
    builder.addCase(reloadPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.dataState = 'fulfilled';
    });
    builder.addCase(reloadPosts.rejected, (state) => {
      state.dataState = 'error';
    });
})

export const postActions = postSlice.actions
export const postReducer = postSlice.reducer