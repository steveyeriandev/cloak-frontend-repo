import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "features/api";
import UserService from "features/users/service";
import {
  loginUrl,
  loginGoogleUrl,
  verifyUrl,
  refreshTokenUrl,
  meUrl,
  registrationUrl,
  forgotPasswordUrl,
} from "./api";
import {
  LOGIN_USER,
  LOGIN_GOOGLE,
  VERIFY_TOKEN,
  FETCH_ME,
  UPDATE_ME,
  UPDATE_PROFILE_IMAGE,
  REGISTER_USER,
  FORGOT_PASSWORD,
  REFRESH_TOKEN,
} from "./constants";

const userService = new UserService();

export const loginGoogleUser = createAsyncThunk(
  LOGIN_GOOGLE,
  async (payload) => {
    const response = await axiosInstance.post(loginGoogleUrl, payload);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  LOGIN_USER,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(loginUrl, payload);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const registerUser = createAsyncThunk(
  REGISTER_USER,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(registrationUrl, payload);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const verifyToken = createAsyncThunk(VERIFY_TOKEN, async (payload) => {
  const response = await axiosInstance.post(verifyUrl, payload);
  return response.data;
});

export const refreshToken = createAsyncThunk(REFRESH_TOKEN, async (payload) => {
  const response = await axiosInstance.post(refreshTokenUrl, {
    refresh: payload.token,
  });
  return response.data;
});

export const fetchMe = createAsyncThunk(FETCH_ME, async () => {
  const response = await axiosInstance.get(meUrl);
  return response.data;
});

export const updateMe = createAsyncThunk(
  UPDATE_ME,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userService.update(payload);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  UPDATE_PROFILE_IMAGE,
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await userService.update(formData);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const forgotPassword = createAsyncThunk(
  FORGOT_PASSWORD,
  async (payload) => {
    const response = await axiosInstance.post(forgotPasswordUrl, payload);
    return response.data;
  }
);
