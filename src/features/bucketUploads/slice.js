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
