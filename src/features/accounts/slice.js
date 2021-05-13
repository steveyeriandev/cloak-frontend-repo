import { createSlice } from "@reduxjs/toolkit";
import ReactPixel from "react-facebook-pixel";
import * as Sentry from "@sentry/react";

import { axiosInstance } from "features/api";
import { autoRegister } from "features/tiers/thunks";
import {
  loginUser,
  loginGoogleUser,
  fetchMe,
  updateMe,
  updateProfileImage,
  refreshToken,
} from "./thunks";

const initialState = {
  token: "",
  user: {},
  isLoading: false,
};

const accountsSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logoutUser: (state) => {
      // Remore the token and sentry affiliation.
      Sentry.configureScope((scope) => scope.setUser(null));
      delete axiosInstance.defaults.headers.common["Authorization"];
      return initialState;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;
      state.token = accessToken;
      state.refresh = refreshToken;
      state.user = user;
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    },
    [loginGoogleUser.fulfilled]: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;
      state.token = accessToken;
      state.refresh = refreshToken;
      state.user = user;
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [refreshToken.fulfilled]: (state, action) => {
      const { access } = action.payload;
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access}`;
      state.token = access;
    },

    [fetchMe.fulfilled]: (state, action) => {
      state.user = action.payload;

      // Set the user for better sentry reporting.
      const { id, email, username, firstName, lastName } = action.payload;
      Sentry.setUser({ id, email, username });

      // Initiate the facebook pixel tracking;
      const advancedMatching = {
        em: email,
        fn: firstName,
        ln: lastName,
      };

      const options = {
        autoConfig: true,
        debug: true,
      };

      ReactPixel.init(1836841293155804, advancedMatching, options);
    },
    [updateMe.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [updateProfileImage.fulfilled]: (state, action) => {
      state.user = action.payload;
    },

    [autoRegister.fulfilled]: (state, action) => {
      // When user is auto-enrolled, then we can add the enrollment to their state.
      state.user.enrollments.push(action.payload);
    },
  },
});

export const { logoutUser } = accountsSlice.actions;

export default accountsSlice.reducer;
