import React from "react";
import Modal from "react-bootstrap/Modal";

import ImageStackCarousel from "components/carousels/ImageStack";
import BaseModal from "components/modals/Base";

function ImageStackModal(props) {
  /* Displays the image stack's images in a carousel modal. */

  return (
    <BaseModal {...props} size="xl" rounded={false} autoFocus={false}>
      <Modal.Body className="p-0">
        <ImageStackCarousel />
      </Modal.Body>
    </BaseModal>
  );
}

export default ImageStackModal;
