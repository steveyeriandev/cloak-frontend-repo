import React from "react";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";

const StyledModalHeader = styled(Modal.Header)`
  border-bottom: 0px !important;

  .modal-title {
    width: 100%;
    text-align: center;
  }
`;

function ModalHeader({ title, ...props }) {
  if (!title) return null;

  return (
    <StyledModalHeader {...props}>
      <Modal.Title>{title}</Modal.Title>
    </StyledModalHeader>
  );
}

ModalHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default ModalHeader;
