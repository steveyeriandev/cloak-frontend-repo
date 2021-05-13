import ApiService from "features/service";
import { axiosInstance } from "features/api";
import { notificationsUrl } from "./api";

class NotificationService extends ApiService {
  listUrl = notificationsUrl;

  listNotifications() {
    // Connects a user's account to stripe.
    return axiosInstance.get(`${this.listUrl}`);
  }

  updateNotifications(notificationId, payload) {
    // Connects a user's account to stripe.
    return axiosInstance.put(`${this.listUrl}${notificationId}/`, payload);
  }

  updatePartialNotifications(notificationId, payload) {
    // Connects a user's account to stripe.
    return axiosInstance.patch(`${this.listUrl}${notificationId}/`, payload);
  }
}

export default NotificationService;
