import { createAsyncThunk } from "@reduxjs/toolkit";
import { CREATE_STACK_IMAGE } from "./constants";
import StackImageService from "./service";

const stackImageService = new StackImageService();

export const createStackImage = createAsyncThunk(
  CREATE_STACK_IMAGE,
  async (formData) => {
    const response = await stackImageService.create(formData);
    return response.data;
  }
);
