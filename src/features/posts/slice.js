import { createSlice } from "@reduxjs/toolkit";

import { fetchPosts, updatePost, deletePost, fetchPostDetails, fetchPostDetailsWithContentType } from "./thunks";

const initialState = {
  next: null,
  entities: [],
  // holds the selected post details
  selectedEntity: null,
};

const postSlice = createSlice({
  name: "slices",
  initialState,
  reducers: {
    clearSelectedEntity: (state) => {
      state.selectedEntity = null;
    }
  },
  extraReducers: {
    [fetchPosts.fulfilled]: (state, action) => {
      // Either append the results or start from scratch.
      state.entities = action.meta.arg.fresh
        ? action.payload.results
        : [...state.entities, ...action.payload.results];
      state.next = action.payload.next;
    },
    [fetchPostDetails.fulfilled]: (state, action) => {
      state.selectedEntity = action.payload;
    },
    [fetchPostDetailsWithContentType.fulfilled]: (state, action) => {
      state.selectedEntity = action.payload;
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

export const { setCurrent, removeCurrent, clearSelectedEntity } = postSlice.actions;

export default postSlice.reducer;
