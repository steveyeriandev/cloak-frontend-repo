import { bucketUploadType } from "./enums";

export function validateUploadFiles(files) {
  /* Validate that the files uploaded are correct. Returns null if valid, or an error message if
     invalid.
  */
  function _validateSize() {
    // We need to limit the size of file we can recevie on the server, until we have chunking.
    let isInvalidSize = false;
    Object.keys(files).forEach((key) => {
      if (files[key].size > 100000000) isInvalidSize = true;
    });

    return isInvalidSize;
  }

  return _validateSize() ? "Please limit files to 100 MB" : null;
}

export function getUploadType(files) {
  /* Returns an integer of the upload enum type, or null if it can't be determined.. */
  if (files.length === 1) {
    if (files[0].type === "application/pdf") return bucketUploadType.pdf;
    if (["video/mp4", "video/quicktime"].includes(files[0].type))
      return bucketUploadType.video;
    if (["audio/mpeg", "audio/wav"].includes(files[0].type))
      return bucketUploadType.audio;
  }

  return bucketUploadType.imageStack;
}
