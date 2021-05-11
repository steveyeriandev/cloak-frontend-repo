import axios from "axios";

function getBaseUrl() {
  return "http://localhost:8000/";
}

export const baseUrl = getBaseUrl();
export const axiosInstance = axios;
export const initialState = {
  entities: [],
  isLoading: false,
};
