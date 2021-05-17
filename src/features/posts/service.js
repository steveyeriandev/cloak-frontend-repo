import ApiService from "../service";
import { axiosInstance } from "features/api";

import { postsUrl } from "./api";

class PostService extends ApiService {
  listUrl = postsUrl;

  fetchPostWIthContentType(objectId, contentType) {
    // Fetches a single object from the resource.
    const url = `${this.listUrl}${contentType}/${objectId}/`;
    return axiosInstance.get(url);
  }
}

export default PostService;
