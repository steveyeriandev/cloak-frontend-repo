import React from "react";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import styled from "styled-components";

import BaseModal from "components/modals/Base";

const StyledVideo = styled.video`
  width: 100%;
`;

function VideoModal({ bucketUpload, ...props }) {
  /* Displays a video that was uploaded to a bucket. */

  return (
    <BaseModal {...props} size="xl" contentClassName="bg-transparent border-0">
      <Modal.Body className="d-flex justify-content-center">
        <StyledVideo autoPlay controls name="media">
          <source src={bucketUpload.uploadFile} type="video/mp4" />
        </StyledVideo>
      </Modal.Body>
    </BaseModal>
  );
}

VideoModal.propTypes = {
  // The bucket upload that has the video url.
  bucketUpload: PropTypes.object,
};

export default VideoModal;
