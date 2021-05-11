import ApiService from "features/service";

import { notificationsUrl } from "./api";

class NotificationService extends ApiService {
  listUrl = notificationsUrl;
}

export default NotificationService;
