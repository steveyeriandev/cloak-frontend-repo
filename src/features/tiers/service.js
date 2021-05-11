import ApiService from "../service";
import { axiosInstance } from "../api";

import { registrationTiersUrl } from "./api";

class RegistrationTierService extends ApiService {
  listUrl = registrationTiersUrl;

  register(registrationTierId) {
    // Auto registers a user for a tier, generally used for free tiers.
    const url = `${this._getDetailUrl(registrationTierId)}register/`;
    return axiosInstance.post(url);
  }
}

export default RegistrationTierService;
