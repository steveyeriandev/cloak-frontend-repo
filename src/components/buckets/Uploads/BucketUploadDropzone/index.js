import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

import DropContainer from "../DropContainer";
import useFileUpload from "hooks/BucketUploadFile";

const StyledDropzone = styled.div`
  &:focus {
    outline: none;
  }
`;

function BucketUploadDropzone({ children, ...props }) {
  /* Provides a dropzone to upload images to an image stack.

     TODO: There is some copy/pasted code between this component and `FileUploadInput` for handling
     the action that happens after selecting the file. Ideally the code is removed from this
     component and it is only on the `FileUploadInput`, however there are some complications with
     combining with `react-dropzone`.
  */
  const handleFileUpload = useFileUpload();

  const onDrop = useCallback((files) => handleFileUpload(files), [
    handleFileUpload,
  ]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function renderContent() {
    // Render the main content to show, depending on if drag is active or not.
    return isDragActive ? <DropContainer /> : children;
  }

  return (
    <StyledDropzone
      {...getRootProps({ onClick: (event) => event.stopPropagation() })}
      {...props}
    >
      <input {...getInputProps()} />
      {renderContent()}
    </StyledDropzone>
  );
}

export default BucketUploadDropzone;
