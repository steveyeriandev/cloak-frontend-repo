import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CREATE_REVENUE_SPLIT,
  UPDATE_REVENUE_SPLIT,
  FETCH_REVENUE_SPLITS,
  DELETE_REVENUE_SPLIT,
} from "./constants";
import RevenueSplitService from "./service";

export const fetchRevenueSplits = createAsyncThunk(
  FETCH_REVENUE_SPLITS,
  async ({ registrationTierId }, { rejectWithValue }) => {
    const service = new RevenueSplitService(registrationTierId);
    try {
      const response = await service.list();
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const updateRevenueSplit = createAsyncThunk(
  UPDATE_REVENUE_SPLIT,
  async (
    { registrationTierId, revenueSplitId, payload },
    { rejectWithValue }
  ) => {
    const service = new RevenueSplitService(registrationTierId);
    try {
      const response = await service.update(revenueSplitId, payload);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const createRevenueSplit = createAsyncThunk(
  CREATE_REVENUE_SPLIT,
  async ({ registrationTierId, payload }, { rejectWithValue }) => {
    const service = new RevenueSplitService(registrationTierId);
    try {
      const response = await service.create(payload);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const deleteRevenueSplit = createAsyncThunk(
  DELETE_REVENUE_SPLIT,
  async ({ revenueSplit }, { rejectWithValue }) => {
    const service = new RevenueSplitService(revenueSplit.registrationTier.id);
    try {
      const response = await service.delete(revenueSplit.id);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);
