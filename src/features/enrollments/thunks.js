import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  REFUND_ENROLLMENT,
  UPDATE_ENROLLMENT,
  CREATE_ENROLLMENT,
  SEND_ENROLLMENT_INVOICE,
} from "./constants";
import EnrollmentService from "./service";

const service = new EnrollmentService();

export const updateEnrollment = createAsyncThunk(
  UPDATE_ENROLLMENT,
  async ({ enrollmentId, payload }, { rejectWithValue }) => {
    try {
      const response = await service.update(enrollmentId, payload);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const createEnrollment = createAsyncThunk(
  CREATE_ENROLLMENT,
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await service.create(payload);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const sendEnrollmentInvoice = createAsyncThunk(
  SEND_ENROLLMENT_INVOICE,
  async ({ enrollmentId }, { rejectWithValue }) => {
    try {
      const response = await service.sendInvoice(enrollmentId);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const refundEnrollment = createAsyncThunk(
  REFUND_ENROLLMENT,
  async (enrollmentId) => {
    const response = await service.refund(enrollmentId);
    return response.data;
  }
);
