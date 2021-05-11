import ApiService from "features/service";

import { mediaItemsUrl } from "./api";

class MediaItemService extends ApiService {
  listUrl = mediaItemsUrl;
}

export default MediaItemService;
