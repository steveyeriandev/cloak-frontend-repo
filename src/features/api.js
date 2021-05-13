import axios from "axios";

function getBaseUrl() {
  if (process.env.REACT_APP_ENV === "production")
    return "https://api.radhowtoclass.com/";
  else if (process.env.REACT_APP_ENV === "staging")
    return "https://api-staging.radhowtoclass.com/";
  else return "http://localhost:8000/";
}

export const baseUrl = getBaseUrl();
export const axiosInstance = axios;
export const initialState = {
  entities: [],
  isLoading: false,
};
