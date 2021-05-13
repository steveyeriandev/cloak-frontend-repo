import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FETCH_NOTIFICATIONS,
  UPDATE_NOTIFICATIONS,
  UPDATE_PARTIAL_NOTIFICATIONS,
} from "./constants";
import NotificationService from "./service";

const service = new NotificationService();

export const fetchNotifications = createAsyncThunk(
  FETCH_NOTIFICATIONS,
  async (cusor, { rejectWithValue }) => {
    // Need to build the url parameters based on the action payload.
    try {
      const response = await service.listNotifications(cusor);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const updateNotifications = createAsyncThunk(
  UPDATE_NOTIFICATIONS,
  async ({ notificationId, payload }, { rejectWithValue }) => {
    try {
      const response = await service.updateNotifications(notificationId, payload);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const updatePartialNotifications = createAsyncThunk(
  UPDATE_PARTIAL_NOTIFICATIONS,
  async ({ notificationId, payload }, { rejectWithValue }) => {
    try {
      const response = await service.updatePartialNotifications(notificationId, payload);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);
