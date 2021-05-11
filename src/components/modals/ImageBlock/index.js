import React from "react";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";

import ImageBlockCarousel from "components/carousels/ImageBlock";
import BaseModal from "components/modals/Base";

function ImageStackModal(props) {
  /* Displays the image stack's images in a carousel modal. */

  return (
    <BaseModal {...props} size="xl">
      <Modal.Body className="p-0">
        <ImageBlockCarousel />
      </Modal.Body>
    </BaseModal>
  );
}

ImageStackModal.propTypes = {
  // The image block object that we're displaying images for.
  imageBlock: PropTypes.object,

  // The selected image id that we should start the carousel on.
  imageId: PropTypes.number,
};

export default ImageStackModal;
