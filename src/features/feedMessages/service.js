import ApiService from "../service";

import { feedMessagesUrl } from "./api";

class FeedMessageService extends ApiService {
  listUrl = feedMessagesUrl;
}

export default FeedMessageService;
