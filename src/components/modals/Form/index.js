import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";

import BaseModal from "components/modals/Base";
import ModalHeader from "components/modals/Header";

function FormModal({ title, subtitle, ...props }) {
  /* Provides a general modal designed to receive a Form in the modal body which handles the action,
     closing modal, and followup actions.
  */

  return (
    <BaseModal {...props}>
      {title && <ModalHeader title={title} />}
      {subtitle && <small className="text-center">{subtitle}</small>}
      <Modal.Body>{props.children}</Modal.Body>
    </BaseModal>
  );
}

FormModal.propTypes = {
  // The title of the modal.
  title: PropTypes.string,

  // Extra text to put under the title.
  subtitle: PropTypes.string,
};

FormModal.defaultProps = {
  title: null,
  subtitle: null,
};

export default FormModal;
