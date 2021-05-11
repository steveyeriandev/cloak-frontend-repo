import ApiService from "../service";
import { axiosInstance } from "../api";

import { actionsUrl } from "./api";

class ActionService {
  shared() {
    // Returns the shared actions, which is sometimes referred to as the "global feed".
    const url = `${actionsUrl}shared/`;
    return axiosInstance.get(url);
  }
}

export default ActionService;
