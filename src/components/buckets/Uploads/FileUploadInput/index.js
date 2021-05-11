import React from "react";

import useFileUpload from "hooks/BucketUploadFile";

function FileUploadInput(props) {
  // Provide the input element to upload files to a bucket.
  const handleFileUpload = useFileUpload();

  return (
    <input
      id="file-upload"
      className="d-none"
      type="file"
      multiple
      {...props}
      onChange={(e) => handleFileUpload(e.target.files)}
    />
  );
}

export default FileUploadInput;
