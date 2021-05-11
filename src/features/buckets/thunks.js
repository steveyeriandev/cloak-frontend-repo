import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FETCH_BUCKET,
  UPDATE_BUCKET,
  CREATE_BUCKET,
  DELETE_BUCKET,
} from "./constants";
import BucketService from "./service";

const service = new BucketService();

export const fetchBucket = createAsyncThunk(FETCH_BUCKET, async (bucketId) => {
  const response = await service.fetch(bucketId);
  return response.data;
});

export const updateBucket = createAsyncThunk(
  UPDATE_BUCKET,
  async ({ bucketId, payload }) => {
    const response = await service.update(bucketId, payload);
    return response.data;
  }
);

export const createBucket = createAsyncThunk(
  CREATE_BUCKET,
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await service.create(payload);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const deleteBucket = createAsyncThunk(
  DELETE_BUCKET,
  async (bucketId) => {
    const response = await service.delete(bucketId);
    return response.data;
  }
);
