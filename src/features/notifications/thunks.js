import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LIST_NOTIFICATIONS,
  FETCH_NOTIFICATIONS,  
  PATCH_NOTIFICATIONS,  
  UPDATE_NOTIFICATIONS,

} from "./contstants";

import NotificationService from "./service";

const service = new NotificationService();

export const fetchNotification = createAsyncThunk(
  FETCH_NOTIFICATIONS,
  async (actionPayload, { rejectWithValue }) => {
    try {
      const response = await service.fetch(actionPayload.objectId);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const listNotifications = createAsyncThunk(
  LIST_NOTIFICATIONS,
  async (actionPayload, { rejectWithValue }) => {
    try {
      const response = await service.list(actionPayload.params);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const partialUpdateNotifications = createAsyncThunk(
  PATCH_NOTIFICATIONS,
  async (actionPayload, { rejectWithValue }) => {
    try {
      const response = await service.update(actionPayload.objectId, actionPayload.data);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);


export const updateNotifications = createAsyncThunk(
  UPDATE_NOTIFICATIONS,
  async (actionPayload, { rejectWithValue }) => {
    try {
      const response = await service.put(actionPayload.objectId, actionPayload.data);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);