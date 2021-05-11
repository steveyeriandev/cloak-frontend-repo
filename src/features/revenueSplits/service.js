import ApiService from "features/service";
import { registrationTiersUrl } from "features/tiers/api";

class RevenueSplitService extends ApiService {
  // Handle requests to the revenue splits endpoint.

  constructor(registrationTierId) {
    super();
    this.listUrl = `${registrationTiersUrl}${registrationTierId}/revenue-splits/`;
  }
}

export default RevenueSplitService;
