import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { useToasts } from "react-toast-notifications";

import { getFullName } from "utils/users";
import ButtonContainer from "components/forms/shared/ButtonContainer";
import ModalBackButton from "components/modals/BackButton";
import { deleteRevenueSplit } from "features/revenueSplits/thunks";

function RevenueSplitConfirmDelete({ revenueSplit, successAction }) {
  // Returns a section of the revenue split modal that will allow the user to delete a revenue split.

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  function handleDelete() {
    // Delete the instance and navigate the user.
    dispatch(deleteRevenueSplit({ revenueSplit }));
    addToast("Revenue split removed", { appearance: "success" });
    successAction();
  }

  return (
    <div>
      <p>
        Are you sure you want to remove the split for{" "}
        <b>{getFullName(revenueSplit.user)}?</b>
        &nbsp; They will no longer receive payments for new registrations.
      </p>

      <ButtonContainer className="justify-content-between">
        <ModalBackButton onClick={successAction} />
        <Button width={170} variant="primary" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrashAlt} /> Yes, remove
        </Button>
      </ButtonContainer>
    </div>
  );
}

RevenueSplitConfirmDelete.propTypes = {
  // The revenue split instance that will be deleted.
  revenueSplit: PropTypes.object.isRequired,

  // Action to take after the instance is deleted.
  successAction: PropTypes.func.isRequired,
};

export default RevenueSplitConfirmDelete;
