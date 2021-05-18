import ApiService from "../service";
import { axiosInstance } from "../api";

import { commentsUrl } from "./api";

class CommentService extends ApiService {
  /* Used mainly to create, delete and update comments. Retrieving comment data is generally
     done on the parent object's service. (i.e. project service can get comments.)
  */
  listUrl = commentsUrl;

  report(commentId) {
    // Reports a comment for inappropriate behavior.
    const url = `${this._getDetailUrl(commentId)}report/`;
    return axiosInstance.post(url);
  }

  addReply({commentId, data}){
    // create a reply for a given comment
    const url = `${this._getDetailUrl(commentId)}add_reply/`;
    return axiosInstance.post(url, data);
  }
}

export default CommentService;
