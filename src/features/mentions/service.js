import { axiosInstance } from "../api";

import { mentionsUrl } from "./api";

class MentionService {
  listUrl = mentionsUrl;

  search(term) {
    // Searches for a given term, which currently is just "username begins with".
    const url = `${this.listUrl}?search=${term}`;
    return axiosInstance.get(url);
  }
}

export default MentionService;
