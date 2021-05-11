import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWrench,
  faTrash,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useToasts } from "react-toast-notifications";
import { useModal } from "react-modal-hook";
import { navigate } from "@reach/router";

import FormModal from "components/modals/Form";
import BucketForm from "components/forms/Bucket";
import ConfirmActionModal from "components/modals/ConfirmAction";
import DropdownButton from "components/controls/DropdownButtonNoCaret";
import { setCurrentBucket } from "features/buckets/slice";
import { deleteBucket } from "features/buckets/thunks";
import { bucketType } from "utils/enums";
import { getProjectUrl } from "utils/projects";

const StyledDropdownButton = styled(DropdownButton)`
  > button {
    width: 100%;
  }
`;

function BucketActionDropdown({ project, bucket }) {
  // Provides the dropdown for performing actions on a bucket object.

  // bucket is only required to have the id and title, so this will get us the whole object.
  const bucketData = project.buckets.find(
    (projectBucket) => projectBucket.id === bucket.id
  );

  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  const [showEditBucketModal, hideEditBucketModal] = useModal(() => {
    // Handles the bucket modal for creating a new bucket..
    return (
      <FormModal onHide={hideEditBucketModal}>
        <BucketForm
          bucket={bucketData}
          closeModal={hideEditBucketModal}
          showAllFields
        />
      </FormModal>
    );
  }, [project, bucket]);

  const [
    showConfirmDeleteBucketModal,
    hideConfirmDeleteBucketModal,
  ] = useModal(() => {
    // Modal for confirming the deletion of a bucket.

    function handleDelete() {
      // Handles the delete action of the confirmation modal.
      setIsDeleteLoading(true);
      dispatch(deleteBucket(bucket.id));
      navigate(getProjectUrl(project));
      dispatch(setCurrentBucket({}));
      hideConfirmDeleteBucketModal();
      addToast("Bucket deleted successfully", { appearance: "success" });
      setIsDeleteLoading(false);
    }

    if (!bucketData) return null;

    let bucketObjectsLabel = "items";
    if (bucketData.kind === bucketType.images) {
      bucketObjectsLabel = "uploads";
    } else if (bucketData.kind === bucketType.feed) {
      bucketObjectsLabel = "messages";
    }

    return (
      <ConfirmActionModal
        confirmAction={handleDelete}
        onHide={hideConfirmDeleteBucketModal}
        confirmButtonProps={{ variant: "danger" }}
        errorMessage={deleteErrorMessage}
        isLoading={isDeleteLoading}
      >
        Are you sure you want to delete the <b>{bucketData.title}</b> bucket? By
        deleting this bucket you will irreversibly delete its associated{" "}
        {bucketObjectsLabel} too.
      </ConfirmActionModal>
    );
  }, [bucketData, isDeleteLoading, deleteErrorMessage]);

  if (!bucket || !bucket.id) return null;

  return (
    <StyledDropdownButton
      title={
        <>
          <FontAwesomeIcon icon={faWrench} /> <span>Bucket Actions</span>
        </>
      }
      size="sm"
      className="my-2"
      variant="secondary"
      caret={false}
    >
      <Dropdown.Item onClick={showEditBucketModal}>
        <FontAwesomeIcon icon={faPencilAlt} /> Edit current bucket
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => {
          setDeleteErrorMessage("");
          showConfirmDeleteBucketModal();
        }}
      >
        <FontAwesomeIcon icon={faTrash} /> Delete current bucket
      </Dropdown.Item>
    </StyledDropdownButton>
  );
}

BucketActionDropdown.propTypes = {
  // The bucket object for which we're rendering the dropdown.
  bucket: PropTypes.object.isRequired,
};

export default BucketActionDropdown;
