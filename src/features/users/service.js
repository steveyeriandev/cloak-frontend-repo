import { axiosInstance } from "features/api";
import { validateEmail } from "utils/users";

import { meUrl } from "features/accounts/api";
import { usersUrl } from "./api";

export default class UserService {
  // Service to handle requests to the users resource.

  constructor() {
    this.url = usersUrl;
  }

  search(term) {
    // Returns data for a given user with a specific search term (either email or username).
    return validateEmail(term)
      ? axiosInstance.get(`${this.url}?email=${term}`)
      : axiosInstance.get(`${this.url}?username=${term}`);
  }

  fetch(username) {
    // Fetches data for a user with a given username.
    return axiosInstance.get(`${this.url}${username}/`);
  }

  update(payload) {
    return axiosInstance.patch(meUrl, payload);
  }
}
