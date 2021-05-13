import React from "react";
import Modal from "react-bootstrap/Modal";

import ImageStackCarousel from "components/carousels/ImageStack";
import BaseModal from "components/modals/Base";
import CommentContainer from "components/comments/Container";
import BucketUploadHeader from "components/buckets/Uploads/Header";
import useGetContentTypeObj from "hooks/GetContentTypeObj";

function ImageStackModal({ bucketUpload, ...props }) {
  /* Displays the image stack's images in a carousel modal. */

  const contentTypeObj = useGetContentTypeObj("bucketupload");

  return (
    <BaseModal {...props} size="lg" autoFocus={false}>
      <Modal.Body className="p-0">
        <BucketUploadHeader bucketUpload={bucketUpload} />
        <ImageStackCarousel bucketUpload={bucketUpload} />
        <CommentContainer
          contentObject={bucketUpload}
          contentTypeObj={contentTypeObj}
        />
      </Modal.Body>
    </BaseModal>
  );
}

export default ImageStackModal;
