import ApiService from "../service";
import { axiosInstance } from "../api";

import { enrollmentsUrl } from "./api";

class EnrollmentService extends ApiService {
  listUrl = enrollmentsUrl;

  refund(enrollmentId) {
    // Refunds a given enrollment.
    const url = `${this._getDetailUrl(enrollmentId)}refund/`;
    return axiosInstance.post(url);
  }

  sendInvoice(enrollmentId) {
    // Sends an invoice to a given enrollment.
    const url = `${this._getDetailUrl(enrollmentId)}send_invoice/`;
    return axiosInstance.post(url);
  }
}

export default EnrollmentService;
