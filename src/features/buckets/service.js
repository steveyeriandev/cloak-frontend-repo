import ApiService from "../service";

import { bucketsUrl } from "./api";

class FeedMessageService extends ApiService {
  listUrl = bucketsUrl;
}

export default FeedMessageService;
