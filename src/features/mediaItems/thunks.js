import { createAsyncThunk } from "@reduxjs/toolkit";
import MediaItemService from "./service";
import { CREATE_MEDIA_ITEM, DELETE_MEDIA_ITEM } from "./constants";

const service = new MediaItemService();

export const createMediaItem = createAsyncThunk(
  CREATE_MEDIA_ITEM,
  async (formData) => {
    const response = await service.create(formData);
    return response.data;
  }
);

export const deleteMediaItem = createAsyncThunk(
  DELETE_MEDIA_ITEM,
  async (mediaItemId) => {
    const response = await service.delete(mediaItemId);
    return response.data;
  }
);
