import ApiService from "features/service";

import { notificationsUrl } from "./api";
import { axiosInstance } from "features/api";

class NotificationService extends ApiService {
  listUrl = notificationsUrl;

  put(objectId, payload) {
    const url = `${this.listUrl}${objectId}/`;
    return axiosInstance.put(url, payload);
  }
  
}

export default NotificationService;
