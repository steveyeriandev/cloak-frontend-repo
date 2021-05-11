/* NOTE: this module is incomplete and not currently being used. The idea here is to remove some
   boilerplate of creating the same behaviors for cerating async thunks, however it has not yet been
   completed.
*/

import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "features/api";

export function fetchObject(action, url) {
  /* Generic function to fetch a single object detail.

    :param action str: The action name that we're using to create the object.
    :param url str: The url that we're sending the request to.
  */
  return createAsyncThunk(action, async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  });
}

export function listObjects(action, url) {
  /* Generic function to fetch a list of objects for a resource.

    :param action str: The action name that we're using to get the object.
    :param url str: The url that we're sending the request to, which may contain the query param.
  */
  return createAsyncThunk(action, async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  });
}

export function createObject(action, url, payload) {
  /* Generic function to create an object with default behavior.

    :param action str: The action name that we're using to create the object.
    :param url str: The url that we're sending the request to.
    :param payload object: The payload for the object that is to be created.
  */
  return createAsyncThunk(action, async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(url, payload);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  });
}

export function updateObject(action, url, payload) {
  /* Generic function to update an object with default behavior.

    :param action str: The action name that we're using to update the object.
    :param url str: The url that we're sending the request to.
    :param payload object (optional): The payload object that we're sending in the request.
  */
  return createAsyncThunk(action, (payload, { rejectWithValue }) => {
    try {
      axiosInstance.patch(url, payload).then((response) => response.data);
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  });
}

export function deleteObject(action, url) {
  /* Generic function to delete an object with default behavior.

    :param action str: The action name that we're using to delete the object.
    :param url str: The url that we're sending the request to.
  */
  return createAsyncThunk(action, async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(url);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  });
}
