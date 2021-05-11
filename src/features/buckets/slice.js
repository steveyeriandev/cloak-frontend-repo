import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "features/api";
import { fetchBucket } from "./thunks";
import {
  createBucketUpload,
  updateBucketUpload,
} from "features/bucketUploads/thunks";
import { createStackImage } from "features/stackImages/thunks";
import {
  createFeedMessage,
  updateFeedMessage,
  deleteFeedMessage,
} from "features/feedMessages/thunks";

const bucketInitialState = {
  ...initialState,

  // Set the currently selected bucket object.
  current: {},
};

const bucketsSlice = createSlice({
  name: "buckets",
  initialState: bucketInitialState,
  reducers: {
    clearBuckets: (state) => {
      return bucketInitialState;
    },
    removeBucketUpload: (state, action) => {
      // Removes a stack from our bucket state.
      const { bucketUploadId } = action.payload;
      let bucket = state.entities.find((bucket) => {
        return (
          bucket.stacks &&
          bucket.stacks.some((stack) => stack.id === bucketUploadId)
        );
      });

      if (bucket && bucket.stacks)
        bucket.stacks = bucket.stacks.filter(
          (stack) => stack.id !== bucketUploadId
        );
    },
    setCurrentBucket: (state, action) => {
      state.current = action.payload;
    },
  },
  extraReducers: {
    [fetchBucket.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchBucket.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [fetchBucket.fulfilled]: (state, action) => {
      let existingBucket = state.entities.find(
        (bucket) => bucket.id === action.payload.id
      );

      if (existingBucket) existingBucket = action.payload;
      else state.entities.push(action.payload);

      state.isLoading = false;
    },
    [createBucketUpload.fulfilled]: (state, action) => {
      const bucket = state.entities.find(
        (bucket) => bucket.id === action.payload.bucket
      );
      bucket.stacks.unshift(action.payload);
    },
    [createStackImage.fulfilled]: (state, action) => {
      // Add the image to its stack.
      const bucket = state.entities.find((bucket) => {
        return (
          bucket.stacks &&
          bucket.stacks.some((stack) => stack.id === action.payload.stack)
        );
      });
      let stack = bucket.stacks.find(
        (stack) => stack.id === action.payload.stack
      );
      if (stack.coverImage === null) stack.coverImage = action.payload;
    },

    [updateBucketUpload.fulfilled]: (state, action) => {
      const bucket = state.entities.find(
        (bucket) => bucket.id === action.payload.bucket
      );

      bucket.stacks = bucket.stacks.map((stack) => {
        if (stack.id !== action.payload.id) return stack;

        return { ...stack, ...action.payload };
      });
    },

    [createFeedMessage.fulfilled]: (state, action) => {
      // Add the feed message into its respective bucket.
      const { bucket } = action.payload;
      state.entities = state.entities.map((bucketObj) => {
        if (bucketObj.id === bucket) bucketObj.feed.unshift(action.payload);
        return bucketObj;
      });
    },
    [updateFeedMessage.fulfilled]: (state, action) => {
      const feedMessageId = action.payload.id;
      const bucketId = action.payload.bucket;
      state.entities = state.entities.map((bucketObj) => {
        if (bucketObj.id === bucketId) {
          bucketObj.feed = bucketObj.feed.map((feedMessage) => {
            if (feedMessage.id === feedMessageId) return action.payload;
            else return feedMessage;
          });
        }
        return bucketObj;
      });
    },
    [deleteFeedMessage.pending]: (state, action) => {
      // Remove the message from the bucket feed data.
      const { feedMessageId } = action.meta.arg;
      state.entities = state.entities.map((bucketObj) => {
        if (bucketObj.feed === undefined) return bucketObj;
        bucketObj.feed = bucketObj.feed.filter(
          (message) => message.id !== feedMessageId
        );
        return bucketObj;
      });
    },
  },
});

export const {
  clearBuckets,
  removeBucketUpload,
  setCurrentBucket,
} = bucketsSlice.actions;

export default bucketsSlice.reducer;
