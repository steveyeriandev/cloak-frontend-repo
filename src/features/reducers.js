import { combineReducers } from "redux";
import projectSlice from "features/projects/slice";
import accountSlice from "features/accounts/slice";
import bucketUploadSlice from "features/bucketUploads/slice";
import bucketSlice from "features/buckets/slice";
import imageUploadSessionSlice from "features/imageUploadSession/slice";
import revenueSplitSlice from "features/revenueSplits/slice";
import contentTypeSlice from "features/contentTypes/slice";

export default combineReducers({
  account: accountSlice,
  buckets: bucketSlice,
  projects: projectSlice,
  bucketUploads: bucketUploadSlice,
  imageUploadSession: imageUploadSessionSlice,
  revenueSplits: revenueSplitSlice,
  contentTypes: contentTypeSlice,
});
