import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FETCH_PROJECTS,
  FETCH_PROJECT,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  FETCH_PROJECT_STUDENTS,
  FETCH_PROJECT_ACCOUNTS,
  CREATE_TEACHER,
  SEARCH_PROJECTS,
} from "./constants";
import ProjectService from "./service";

const service = new ProjectService();

export const fetchProjects = createAsyncThunk(
  FETCH_PROJECTS,
  async (actionPayload, { rejectWithValue }) => {
    // Need to build the url parameters based on the action payload.
    try {
      const response = await service.list(actionPayload.params);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const fetchProject = createAsyncThunk(
  FETCH_PROJECT,
  async (projectId) => {
    const response = await service.fetch(projectId);
    return response.data;
  }
);

export const createProject = createAsyncThunk(
  CREATE_PROJECT,
  async (actionPayload) => {
    const response = await service.create(actionPayload);
    return response.data;
  }
);

export const updateProject = createAsyncThunk(
  UPDATE_PROJECT,
  async ({ projectId, payload }) => {
    // Need to clean the teachers data to only send the ids.
    if (payload.teachers !== undefined)
      payload.teachers = payload.teachers.map((teacher) => teacher.id);

    const response = await service.update(projectId, payload);
    return response.data;
  }
);

export const updateProjectImage = createAsyncThunk(
  UPDATE_PROJECT,
  async ({ projectId, formData }) => {
    const response = await service.update(projectId, formData);
    return response.data;
  }
);

export const fetchProjectEnrollments = createAsyncThunk(
  FETCH_PROJECT_STUDENTS,
  async (projectId) => {
    const response = await service.listEnrollments(projectId);
    return response.data;
  }
);

export const fetchProjectAccounts = createAsyncThunk(
  FETCH_PROJECT_ACCOUNTS,
  async ({ projectId }) => {
    const response = await service.listAccounts(projectId);
    return response.data;
  }
);

export const createTeacher = createAsyncThunk(
  CREATE_TEACHER,
  async ({ projectId, payload }, { rejectWithValue }) => {
    try {
      const response = await service.createTeacher(projectId, payload);
      return response.data;
    } catch (err) {
      const { status, data } = err.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const searchProjects = createAsyncThunk(
  SEARCH_PROJECTS,
  async ({ payload }) => {
    // Expects the search term in payload `{search: "term"}`.
    const response = await service.list(payload);
    return response.data;
  }
);
