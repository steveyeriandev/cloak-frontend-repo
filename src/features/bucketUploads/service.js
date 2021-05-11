import ApiService from "../service";
import { axiosInstance } from "../api";

import { bucketUploadsUrl } from "./api";

class BucketUploadService extends ApiService {
  listUrl = bucketUploadsUrl;

  share(bucketUploadId) {
    // Shares the bucket upload to the global feed.
    const url = `${this._getDetailUrl(bucketUploadId)}share/`;
    return axiosInstance.post(url);
  }

  comments(bucketUploadId) {
    // Fetches the comments for a given project.
    const url = `${this._getDetailUrl(bucketUploadId)}comments/`;
    return axiosInstance.get(url);
  }

  report(bucketUploadId) {
    // Reports an upload for inappropriate behavior.
    const url = `${this._getDetailUrl(bucketUploadId)}report/`;
    return axiosInstance.post(url);
  }
}

export default BucketUploadService;
