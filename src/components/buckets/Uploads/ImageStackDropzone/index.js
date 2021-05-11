import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";

import { createBucketUpload } from "features/bucketUploads/thunks";
import { createStackImage } from "features/stackImages/thunks";
import {
  createUploadSession,
  incrementUploadCount,
  resetUploadSession,
} from "features/imageUploadSession/slice";
import DropContainer from "../DropContainer";
import FileUploadInput from "../FileUploadInput";
import { validateUploadFiles, getUploadType } from "utils/uploads";
import { bucketUploadType } from "utils/enums";

const StyledDropzone = styled.div`
  &:focus {
    outline: none;
  }
`;

function ImageStackUploadDropzone({ children, ...props }) {
  /* Provides a dropzone to upload images to an image stack.

     TODO: There is some copy/pasted code between this component and `FileUploadInput` for handling
     the action that happens after selecting the file. Ideally the code is removed from this
     component and it is only on the `FileUploadInput`, however there are some complications with
     combining with `react-dropzone`.
  */

  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const currentBucket = useSelector((state) => state.buckets.current);

  const onDrop = useCallback(
    async (files) => {
      /* TODO: This logic is all copied with `FileUploadInput` component, it could possibly be moved
       out into a hook...?
    */
      async function dispatchStackImage(formData) {
        // Need to pull this dispatch action out to have async at top level.
        const action = await dispatch(createStackImage(formData));
        if (action.type === "CREATE_STACK_IMAGE/fulfilled")
          dispatch(incrementUploadCount());
        else {
          addToast(
            "There was an error uploading an image, please verify all files are valid image files.",
            { autoDismiss: true, appearance: "error", autoDismissTimeout: 5000 }
          );
          dispatch(resetUploadSession());
        }
      }

      const invalidMessage = validateUploadFiles(files);
      if (invalidMessage !== null)
        return addToast(invalidMessage, {
          autoDismiss: true,
          appearance: "error",
        });

      // Set the form data to send in request.
      const uploadType = getUploadType(files);
      let formData = new FormData();
      formData.append("bucket", currentBucket.id);
      formData.append("kind", uploadType);
      if (uploadType !== bucketUploadType.imageStack) {
        // With form data, we need to use snake_case instead of camelCase.
        formData.append("upload_file", files[0]);
      }

      const action = await dispatch(createBucketUpload(formData));

      if (action.type === "CREATE_BUCKET_UPLOAD/rejected") {
        addToast("Error creating new stack.", { appearance: "error" });
      } else if (
        action.type === "CREATE_BUCKET_UPLOAD/fulfilled" &&
        uploadType === bucketUploadType.imageStack
      ) {
        // The stack was created, now we can upload the images by looping through the files.
        dispatch(createUploadSession({ total: files.length }));

        Object.keys(files).forEach((fileIndex) => {
          let file = files[fileIndex];
          let formData = new FormData();
          formData.append("stack", action.payload.id);
          formData.append("image", file);
          dispatchStackImage(formData);
        });
      }
    },
    [addToast, dispatch, currentBucket.id]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function renderContent() {
    // Render the main content to show, depending on if drag is active or not.
    return isDragActive ? <DropContainer /> : children;
  }

  return (
    <StyledDropzone
      {...getRootProps({
        onClick: (event) => event.stopPropagation(),
      })}
      {...props}
    >
      <FileUploadInput {...getInputProps()} />
      {renderContent()}
    </StyledDropzone>
  );
}

export default ImageStackUploadDropzone;
