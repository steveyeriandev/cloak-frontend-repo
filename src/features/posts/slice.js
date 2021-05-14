import { createSlice } from "@reduxjs/toolkit";

import { fetchPosts, updatePost, deletePost } from "./thunks";

const initialState = {
  next: null,
  entities: [],
};

const postSlice = createSlice({
  name: "slices",
  initialState,
  extraReducers: {
    [fetchPosts.fulfilled]: (state, action) => {
      // Either append the results or start from scratch.
      state.entities = action.meta.arg.fresh
        ? action.payload.results
        : [...state.entities, ...action.payload.results];
      state.next = action.payload.next;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.entities = state.entities.map((post) => {
        if (post.id !== action.meta.arg.postId) return post;
        return action.payload;
      });
    },
    [deletePost.fulfilled]: (state, action) => {
      state.entities = state.entities.filter((post) => {
        return post.id !== action.meta.arg.postId;
      });
    },
  },
});

export const { setCurrent, removeCurrent } = postSlice.actions;

export default postSlice.reducer;
