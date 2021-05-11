import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";

const BaseModal = ({ rounded, ...props }) => {
  function getContentClassNames() {
    // Default to rounded corners.
    return rounded === false ? "rounded-0" : "";
  }

  return (
    <Modal
      centered
      show={true}
      onHide={props.onHide}
      contentClassName={getContentClassNames()}
      {...props}
    >
      {props.children}
    </Modal>
  );
};

BaseModal.propTypes = {
  onHide: PropTypes.func,
};

export default BaseModal;
