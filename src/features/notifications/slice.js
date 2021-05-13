import { createSlice } from "@reduxjs/toolkit";
import {
  fetchNotifications,
  updateNotifications,
  updatePartialNotifications,
} from "./thunks";


const initialState = {
  status: "idle",
  total: 0,
  current: 0,
};

const notificationInitialState = {
  ...initialState,

  // Each key in the entiries will be a project "type", such as classes or recordings.
  entities: {},

  // Used to store a single project detail data.
  notifications: {},

};

const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {
    clearNotifications: (state) => {
      return notificationInitialState;
    },
    clearSearch: (state) => {
      state.notifications = notificationInitialState.notifications;
    },

  },
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.notifications = {
        ...state.detail,
        ...action.payload,
      };
    },

    [updateNotifications.fulfilled]: (state, action) => {
      // When we update a project, we need to update the project detail state.
      state.notifications = {
        ...state.detail,
        ...action.payload,
      };
    },

    [updatePartialNotifications.fulfilled]: (state, action) => {
      // When we update a project, we need to update the project detail state.
      state.notifications = {
        ...state.detail,
        ...action.payload,
      };
    },
  }
});

export const {
  clearNotifications,
  clearSearch,
} = notificationSlice.actions;

export default notificationSlice.reducer;
