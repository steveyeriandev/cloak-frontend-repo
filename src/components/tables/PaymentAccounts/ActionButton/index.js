import React from "react";
import PropTypes from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";
import { useModal } from "react-modal-hook";

import FormModal from "components/modals/Form";
import ActionButton from "components/buttons/ActionButton";
import RevenueSplitForm from "components/forms/RevenueSplit";

function RevenueSplitActionButton({ revenueSplit }) {
  // Returns the actions that user can perform on a revenue split instance.

  const [showSplitPercentModal, hideSplitPercentModal] = useModal(() => {
    // Shows the modal to update the revenue split instance.
    return (
      <FormModal title="Update revenue split" onHide={hideSplitPercentModal}>
        <RevenueSplitForm
          revenueSplit={revenueSplit}
          closeModal={hideSplitPercentModal}
        />
      </FormModal>
    );
  }, [revenueSplit]);

  return (
    <ActionButton>
      <Dropdown.Item onClick={showSplitPercentModal}>
        Percent Split
      </Dropdown.Item>
    </ActionButton>
  );
}

RevenueSplitActionButton.propTypes = {
  revenueSplit: PropTypes.object.isRequired,
};

export default RevenueSplitActionButton;
