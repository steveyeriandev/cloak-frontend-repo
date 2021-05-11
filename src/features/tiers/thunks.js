import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AUTO_REGISTER,
  UPDATE_REGISTRATION_TIER,
  CREATE_REGISTRATION_TIER,
  DELETE_REGISTRATION_TIER,
} from "./constants";
import RegistrationTierService from "./service";

const service = new RegistrationTierService();

export const createRegistrationTier = createAsyncThunk(
  CREATE_REGISTRATION_TIER,
  async (payload, { rejectWithValue }) => {
    // We need to clear the times off some of the datetime objects.
    if (payload.startDate && payload.startDate.format)
      payload.startDate = payload.startDate.format("YYYY-MM-DD");

    if (payload.endDate && payload.endDate.format)
      payload.endDate = payload.endDate.format("YYYY-MM-DD");

    try {
      const response = await service.create(payload);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const updateRegistrationTier = createAsyncThunk(
  UPDATE_REGISTRATION_TIER,
  async ({ registrationTierId, payload }, { rejectWithValue }) => {
    // We need to clear the times off some of the datetime objects.
    if (payload.startDate && payload.startDate.format)
      payload.startDate = payload.startDate.format("YYYY-MM-DD");

    if (payload.endDate && payload.endDate.format)
      payload.endDate = payload.endDate.format("YYYY-MM-DD");

    try {
      const response = await service.update(registrationTierId, payload);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const deleteRegistrationTier = createAsyncThunk(
  DELETE_REGISTRATION_TIER,
  async (registrationTierId, { rejectWithValue }) => {
    try {
      const response = await service.delete(registrationTierId);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const autoRegister = createAsyncThunk(
  AUTO_REGISTER,
  async ({ registrationTierId }, { rejectWithValue }) => {
    try {
      const response = await service.register(registrationTierId);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);
