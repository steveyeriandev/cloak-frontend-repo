import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function ModalBackButton(props) {
  // A button used to go back to the previous section of a modal.
  return (
    <Button variant="secondary" {...props}>
      <FontAwesomeIcon icon={faChevronLeft} /> Back
    </Button>
  );
}

ModalBackButton.propTypes = {
  // The action to take the user back to the previous modal section.
  onClick: PropTypes.func.isRequired,
};

export default ModalBackButton;
