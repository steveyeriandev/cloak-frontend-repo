import { createSlice } from "@reduxjs/toolkit";
import {
    fetchNotification,
    listNotifications,
    partialUpdateNotifications,
    updateNotifications
} from "./thunks";


import { initialState } from "features/api";

const notificationsInitialState = {
  ...initialState,

  // Each key in the entiries will be a notifications "type", such as classes or recordings.
  entities: {},

  // Used to store a single notifications detail data.
  detail: {},

  // display comment replies when notification redirects to 
  // a comment ( reply on a comment notifications)
  displayRepliesForComment: null,

  // The results of a notifications search
  search: {
    results: [],
    next: null,
  },
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: notificationsInitialState,
  reducers: {
    clearnotifications: (state) => {
      return notificationsInitialState;
    },
    clearSearch: (state) => {
      state.search = notificationsInitialState.search;
    },
    setDisplayCommentFor(state, action){
      const id = action.payload.commentId;
      state.displayRepliesForComment = id;
    }
  },
  extraReducers: {
    [fetchNotification.fulfilled]: (state, action) => {
      state.detail = {
        ...state.detail,
        ...action.payload,
      };
    },

    [listNotifications.fulfilled]: (state, action) => {
        state.entities = action.payload;
    },

    [updateNotifications.fulfilled]: (state, action) => {
      // When we update a notifications, we need to update the notifications detail state.
      state.detail = {
        ...state.detail,
        ...action.payload,
      };

      state.entities.results = state.entities.results.map((entry) => entry.id == action.payload.id ?  action.payload : entry)
    },

    [partialUpdateNotifications.fulfilled]: (state, action) => {
        // When we update a notifications, we need to update the notifications detail state.
        state.detail = {
          ...state.detail,
          ...action.payload,
        };
  
        state.entities.results = state.entities.results.map((entry) => entry.id == action.payload.id ?  action.payload : entry)
      },
  },
});

export const {
  clearnotifications,
  clearSearch,
  setDisplayCommentFor
} = notificationsSlice.actions;

export default notificationsSlice.reducer;