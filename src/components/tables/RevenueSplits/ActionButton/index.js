import React from "react";
import PropTypes from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";

import ActionButton from "components/buttons/ActionButton";

function RevenueSplitActionButton({ revenueSplit, modalActionProps }) {
  // Returns the actions that user can perform on a revenue split instance.

  const {
    navigateEdit,
    navigateDeleteConfirm,
    setSelectedRevenueSplit,
  } = modalActionProps;

  function handleEditClick() {
    setSelectedRevenueSplit(revenueSplit);
    navigateEdit();
  }

  function handleNavigateConfirmDelete() {
    setSelectedRevenueSplit(revenueSplit);
    navigateDeleteConfirm();
  }

  return (
    <ActionButton>
      <Dropdown.Item onClick={handleEditClick}>Edit</Dropdown.Item>
      <Dropdown.Item onClick={handleNavigateConfirmDelete}>
        Remove
      </Dropdown.Item>
    </ActionButton>
  );
}

RevenueSplitActionButton.propTypes = {
  // The revenue split object that an action will be performed on.
  revenueSplit: PropTypes.object.isRequired,

  // Properties passed down from the parent modal.
  modalActionProps: PropTypes.shape({
    navigateEdit: PropTypes.func.isRequired,
    navigateDeleteConfirm: PropTypes.func.isRequired,
    setSelectedRevenueSplit: PropTypes.func.isRequired,
  }),
};

export default RevenueSplitActionButton;
