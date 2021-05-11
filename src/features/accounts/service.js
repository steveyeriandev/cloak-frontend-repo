import { axiosInstance } from "features/api";

import { changePasswordUrl } from "./api";

export default class AccountService {
  // Service to handle requests to the users resource.

  changePassword(payload) {
    return axiosInstance.post(changePasswordUrl, payload);
  }
}
