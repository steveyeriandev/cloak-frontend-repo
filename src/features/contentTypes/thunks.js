import { createAsyncThunk } from "@reduxjs/toolkit";
import ContentTypeService from "./service";
import { FETCH_CONTENT_TYPES } from "./constants";

const contentTypeService = new ContentTypeService();

export const fetchContentTypes = createAsyncThunk(
  FETCH_CONTENT_TYPES,
  async () => {
    const response = await contentTypeService.list();
    return response.data;
  }
);
