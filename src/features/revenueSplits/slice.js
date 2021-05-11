import { createSlice } from "@reduxjs/toolkit";

import {
  fetchRevenueSplits,
  updateRevenueSplit,
  deleteRevenueSplit,
  createRevenueSplit,
} from "./thunks";

const initialState = {
  entities: [],
};

const revenueSplitsSlice = createSlice({
  name: "revenueSplits",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRevenueSplits.fulfilled]: (state, action) => {
      state.entities = action.payload;
    },
    [createRevenueSplit.fulfilled]: (state, action) => {
      // Find the revenue split instance and update it in the state.
      state.entities.push(action.payload);
    },
    [updateRevenueSplit.fulfilled]: (state, action) => {
      // Find the revenue split instance and update it in the state.
      state.entities = state.entities.map((revenueSplit) => {
        if (action.meta.arg.revenueSplitId === revenueSplit.id)
          return action.payload;
        return revenueSplit;
      });
    },
    [deleteRevenueSplit.pending]: (state, action) => {
      // optimistically remove the revenue split instance.
      state.entities = state.entities.filter((revenueSplit) => {
        return revenueSplit.id !== action.meta.arg.revenueSplit.id;
      });
    },
  },
});

export default revenueSplitsSlice.reducer;
