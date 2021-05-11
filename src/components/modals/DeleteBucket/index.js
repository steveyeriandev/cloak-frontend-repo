import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";

import BaseModal from "components/modals/Base";
import { deleteBucket } from "features/buckets/thunks";

function DeleteBucketModal({ bucket, ...props }) {
  // Confirm deletion of a bucket.
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  async function handleDelete() {
    dispatch(deleteBucket(bucket.id));
    props.onHide();
    addToast("Bucket deleted", { appearance: "success" });
  }

  return (
    <BaseModal {...props} size="sm">
      <Modal.Body>
        Deleting the <b>{bucket.title}</b> is permanent and will remove it from
        any tier it's being used in.
      </Modal.Body>
      <Modal.Footer>
        <Button className="m-auto" variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </BaseModal>
  );
}

DeleteBucketModal.propTypes = {
  // The bucket object that we're confirming deletion.
  bucket: PropTypes.object.isRequired,
};

export default DeleteBucketModal;
