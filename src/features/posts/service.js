import ApiService from "../service";

import { postsUrl } from "./api";

class PostService extends ApiService {
  listUrl = postsUrl;
}

export default PostService;
