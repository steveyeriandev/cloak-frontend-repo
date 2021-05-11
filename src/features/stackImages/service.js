import ApiService from "../service";

import { stackImagesUrl } from "./api";

class StackImageService extends ApiService {
  listUrl = stackImagesUrl;
}

export default StackImageService;
