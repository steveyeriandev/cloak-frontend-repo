import ApiService from "../service";
import { axiosInstance } from "features/api";

import { postsUrl } from "./api";

class PostService extends ApiService {
  listUrl = postsUrl;

  fetchPostWIthContentType(objectId, contentType){
    // Fetches a single object from the resource.
    const url = `${this.listUrl}retrieve-with-contenttype-and-objectid/${contentType}/${objectId}/`;
    return axiosInstance.get(url);
  }

  addLike(objectId){
    const url = `${this.listUrl}${objectId}/add_like/`;
    return axiosInstance.post(url, null);
  }
}

export default PostService;
