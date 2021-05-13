import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { useModal } from "react-modal-hook";

import useFeedShare from "hooks/FeedShare";
import { bucketUploadType } from "utils/enums";
import { createBucketUpload } from "features/bucketUploads/thunks";
import { createStackImage } from "features/stackImages/thunks";
import {
  createUploadSession,
  incrementUploadCount,
  resetUploadSession,
} from "features/imageUploadSession/slice";
import { validateUploadFiles, getUploadType } from "utils/uploads";

function useBucketUploadFile(files) {
  /* Provide functionality for uploading bucket uploads, which is reused for manual selection or
     drag and drop.

     In general we have a few different types of uploads that can happen, although this will change
     as time progresses. We handle these types of uploads a bit differently, which has its
     functionality in this component.

     1) Image stack - multiple image files that will be uploaded together
     2) PDF file
     3) Video file
     4) Audio file
  */
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const currentBucket = useSelector((state) => state.buckets.current);
  const [uploadId, setUploadId] = useState();
  const showConfirmShareModal = useFeedShare(
    "bucketupload",
    "Upload Successful!",
    uploadId
  );
  const [bucketUpload, setBucketUpload] = useState(null);

  // const mb = 1048576;
  // const chunkSize = mb * 0.1;
  // const maxFileSize = mb * 10;

  function _getBaseFormData(uploadType) {
    // Creates standard form data that is used for all types of uploads.
    let formData = new FormData();
    formData.append("bucket", currentBucket.id);
    formData.append("kind", uploadType);
    return formData;
  }

  async function _dispatchStackImage(formData) {
    // Need to pull this dispatch action out to have async at top level.
    const action = await dispatch(createStackImage(formData));
    if (action.type === "CREATE_STACK_IMAGE/fulfilled") {
      dispatch(incrementUploadCount());
    } else {
      addToast(
        "There was an error uploading an image, please verify all files are valid image files.",
        { autoDismiss: true, appearance: "error", autoDismissTimeout: 5000 }
      );
      dispatch(resetUploadSession());
    }
  }

  async function _createBucketUpload(formData) {
    // Creates the Base bucket upload object and returns the action.
    const action = await dispatch(createBucketUpload(formData));
    setBucketUpload(action.payload);
    return action;
  }

  async function _uploadImageStack(files) {
    // Performs the upload process for an image stack.
    let formData = _getBaseFormData(bucketUploadType.imageStack);

    const action = await _createBucketUpload(formData);
    if (action.type === "CREATE_BUCKET_UPLOAD/rejected") {
      addToast("Error creating new bucket upload.", { appearance: "error" });
    } else if (action.type === "CREATE_BUCKET_UPLOAD/fulfilled") {
      // The stack was created, now we can upload the images by looping through the files.
      dispatch(createUploadSession({ total: files.length }));

      Object.keys(files).forEach((fileIndex) => {
        let file = files[fileIndex];
        let formData = new FormData();
        formData.append("stack", action.payload.id);
        formData.append("image", file);
        _dispatchStackImage(formData);
      });

      setUploadId(action.payload.id);
    }
  }

  async function _uploadSingleBucketUpload(file, uploadType) {
    // Uploads a single file as a bucket upload.
    let formData = _getBaseFormData(uploadType);
    formData.append("upload_file", file);

    const action = await dispatch(createBucketUpload(formData));

    if (action.type === "CREATE_BUCKET_UPLOAD/rejected") {
      addToast("Error creating new upload.", { appearance: "error" });
    } else if (action.type === "CREATE_BUCKET_UPLOAD/fulfilled") {
      addToast("Upload completed successfully.", { appearance: "success" });
      setUploadId(action.payload.id);
      showConfirmShareModal();
    }
  }

  function onFileUpload(files) {
    // Main handler for when we select the images to upload.
    const invalidMessage = validateUploadFiles(files);
    if (invalidMessage !== null)
      return addToast(invalidMessage, {
        autoDismiss: true,
        appearance: "error",
      });

    // Set the form data to send in request.
    const uploadType = getUploadType(files);
    if (uploadType === bucketUploadType.imageStack) {
      _uploadImageStack(files);
    } else {
      _uploadSingleBucketUpload(files[0], uploadType);
    }
  }

  return onFileUpload;
}

export default useBucketUploadFile;
