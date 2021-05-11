import { axiosInstance } from "../api";
import { supportEmailUrl } from "./api";

class EmailService {
  sendSupportEmail(payload) {
    // Sends an email to support.
    return axiosInstance.post(supportEmailUrl, payload);
  }
}
