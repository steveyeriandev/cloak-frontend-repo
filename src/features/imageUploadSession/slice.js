import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  total: 0,
  current: 0,
};

const imageUploadSessionSlice = createSlice({
  name: "imageUploadSession",
  initialState,
  reducers: {
    createUploadSession(state, action) {
      // Create a new upload session object.
      state.status = "running";
      state.total = action.payload.total;
    },
    incrementUploadCount(state) {
      /* Let our store know that we've processed an additional upload, and handle if we've finished
         our uploads.
      */
      if (state.current + 1 === state.total) state.status = "complete";

      state.current += 1;
    },
    resetUploadSession() {
      return initialState;
    },
  },
});

export const {
  createUploadSession,
  incrementUploadCount,
  resetUploadSession,
} = imageUploadSessionSlice.actions;

export default imageUploadSessionSlice.reducer;
