import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CREATE_FEED_MESSAGE,
  UPDATE_FEED_MESSAGE,
  DELETE_FEED_MESSAGE,
} from "./constants";
import FeedMessageService from "./service";

const service = new FeedMessageService();

export const createFeedMessage = createAsyncThunk(
  CREATE_FEED_MESSAGE,
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

export const updateFeedMessage = createAsyncThunk(
  UPDATE_FEED_MESSAGE,
  async ({ feedMessageId, payload }, { rejectWithValue }) => {
    try {
      const response = await service.update(feedMessageId, payload);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const deleteFeedMessage = createAsyncThunk(
  DELETE_FEED_MESSAGE,
  async ({ feedMessageId }, { rejectWithValue }) => {
    try {
      const response = await service.delete(feedMessageId);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);
