import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";

import BaseModal from "components/modals/Base";
import LoadingButton from "components/buttons/Loading";
import { deleteBucketUpload } from "features/bucketUploads/thunks";
import { removeBucketUpload } from "features/buckets/slice";
import { bucketUploadType } from "utils/enums";

function DeleteBucketUpload({ bucketUpload, ...props }) {
  /* Displays the image stack's images in a carousel modal. */
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToasts();

  async function handleDelete() {
    setIsLoading(true);
    const action = await dispatch(deleteBucketUpload(bucketUpload.id));
    setIsLoading(false);
    if (action.type === "DELETE_BUCKET_UPLOAD/rejected") {
      addToast("Error deleting stack", {
        autoDismiss: true,
        appearance: "error",
      });
    } else if (action.type === "DELETE_BUCKET_UPLOAD/fulfilled") {
      addToast(`${getFiletypeDescription()} deleted successfully`, {
        autoDismiss: true,
        appearance: "success",
      });
      dispatch(removeBucketUpload({ bucketUploadId: bucketUpload.id }));
    }

    props.onHide();
  }

  const getFiletypeDescription = function () {
    switch (bucketUpload.kind) {
      case bucketUploadType.video:
        return "video";
      case bucketUploadType.pdf:
        return "pdf";
      case bucketUploadType.imageStack:
        return "image stack";
      default:
        return "file";
    }
  };

  return (
    <BaseModal {...props} size="sm">
      <Modal.Body>
        Are you sure you want to delete this {getFiletypeDescription()}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="link" onClick={props.onHide}>
          Cancel
        </Button>
        <LoadingButton
          width={120}
          variant="danger"
          onClick={handleDelete}
          isLoading={isLoading}
        >
          Yes, delete
        </LoadingButton>
      </Modal.Footer>
    </BaseModal>
  );
}

DeleteBucketUpload.propTypes = {
  // The image stack object that we're confirming deletion.
  imageStack: PropTypes.object,
};

export default DeleteBucketUpload;
