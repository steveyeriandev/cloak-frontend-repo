import ApiService from "../service";

import { contentTypesUrl } from "./api";

class ContentTypeService extends ApiService {
  listUrl = contentTypesUrl;
}

export default ContentTypeService;
