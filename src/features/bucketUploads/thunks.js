import { createAsyncThunk } from "@reduxjs/toolkit";
import BucketUploadService from "./service";
import {
  CREATE_BUCKET_UPLOAD,
  DELETE_BUCKET_UPLOAD,
  FETCH_BUCKET_UPLOAD,
  UPDATE_BUCKET_UPLOAD,
} from "./constants";

const bucketUploadService = new BucketUploadService();

export const createBucketUpload = createAsyncThunk(
  CREATE_BUCKET_UPLOAD,
  async (formData) => {
    const response = await bucketUploadService.create(formData);
    return response.data;
  }
);

export const fetchBucketUpload = createAsyncThunk(
  FETCH_BUCKET_UPLOAD,
  async (stackId) => {
    const response = await bucketUploadService.fetch(stackId);
    return response.data;
  }
);

export const updateBucketUpload = createAsyncThunk(
  UPDATE_BUCKET_UPLOAD,
  async ({ stackId, payload }) => {
    const response = await bucketUploadService.update(stackId, payload);
    return response.data;
  }
);

export const deleteBucketUpload = createAsyncThunk(
  DELETE_BUCKET_UPLOAD,
  async (stackId) => {
    const response = await bucketUploadService.delete(stackId);
    return response.data;
  }
);
