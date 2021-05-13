import React from "react";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";

import BaseModal from "components/modals/Base";
import CommentContainer from "components/comments/Container";
import BucketUploadHeader from "components/buckets/Uploads/Header";
import useGetContentTypeObj from "hooks/GetContentTypeObj";

function BucketUploadModal({ bucketUpload, ...props }) {
  /* Provides a general modal to open when a bucket upload is clicked, which shows meta data as
     well as comments. Generally just the content image section will be different for the various
     types of uploads.
  */

  const contentTypeObj = useGetContentTypeObj("bucketupload");

  return (
    <BaseModal {...props} size="lg">
      <Modal.Body className="p-0">
        <BucketUploadHeader bucketUpload={bucketUpload} />
        <div className="d-flex align-items-center justify-content-center">
          {props.children}
        </div>
        <CommentContainer
          contentObject={bucketUpload}
          contentTypeObj={contentTypeObj}
        />
      </Modal.Body>
    </BaseModal>
  );
}

BucketUploadModal.propTypes = {
  // The bucket upload object that is being rendered in the modal.
  bucketUpload: PropTypes.object.isRequired,
};

export default BucketUploadModal;
