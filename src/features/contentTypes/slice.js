import { createSlice } from "@reduxjs/toolkit";

import { fetchContentTypes } from "./thunks";

const initialState = {
  entities: [],
};

const bucketUploadsSlice = createSlice({
  name: "bucketUploads",
  initialState,
  extraReducers: {
    [fetchContentTypes.fulfilled]: (state, action) => {
      state.entities = action.payload;
    },
  },
});

export const { setCurrent, removeCurrent } = bucketUploadsSlice.actions;

export default bucketUploadsSlice.reducer;
