import { createSlice } from "@reduxjs/toolkit";

import { fetchBucketUpload } from "./thunks";

const initialState = {
  current: {
    isLoading: false,
  },
};

const bucketUploadsSlice = createSlice({
  name: "bucketUploads",
  initialState,
  reducers: {
    setCurrent(state, action) {
      // Current stack that we're navigating through.
      state.current = { ...state.current, ...action.payload };
    },
    removeCurrent(state, action) {
      // Remove the current stack when we're done navigating.
      return initialState;
    },
  },
  extraReducers: {
    [fetchBucketUpload.pending]: (state) => {
      state.current.isLoading = true;
    },
    [fetchBucketUpload.rejected]: (state) => {
      state.current.isLoading = false;
    },
    [fetchBucketUpload.fulfilled]: (state, action) => {
      state.current = { ...action.payload, isLoading: false };
    },
  },
});

export const { setCurrent, removeCurrent } = bucketUploadsSlice.actions;

export default bucketUploadsSlice.reducer;
