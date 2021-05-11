import React from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faInfoCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

import RevenueSplitsTable from "components/tables/RevenueSplits";
import ModalBackButton from "components/modals/BackButton";

function RevenueSplitContainer({
  revenueSplits,
  modalActionProps,
  setContentSection,
  canCreate,
}) {
  // Provides a container for showing the revenue split display section of the revenue split modal.
  let totalSplit = 0;
  revenueSplits.forEach(
    (revenueSplit) => (totalSplit += revenueSplit.splitPercent)
  );

  return (
    <div>
      {totalSplit !== 100 && revenueSplits.length > 0 && (
        <Alert variant="warning">
          <FontAwesomeIcon icon={faExclamationTriangle} /> Revenue split is not
          100%, no registrations will be accepted.
        </Alert>
      )}
      {revenueSplits.length > 0 ? (
        <RevenueSplitsTable
          revenueSplits={revenueSplits}
          className="mb-3"
          modalActionProps={modalActionProps}
        />
      ) : (
        <Alert variant="info" className="text-center mb-5">
          <FontAwesomeIcon icon={faInfoCircle} /> All revenue will go to the
          project creator
        </Alert>
      )}
      <div className="d-flex justify-content-between">
        <ModalBackButton
          onClick={() => setContentSection("editRegistrationTier")}
        />
        {canCreate && (
          <Button
            variant="primary"
            onClick={() => setContentSection("createRevenueSplit")}
          >
            <FontAwesomeIcon icon={faPlusCircle} /> Create new split
          </Button>
        )}
      </div>
    </div>
  );
}

RevenueSplitContainer.propTypes = {
  // The revenue split objects we're displaying.
  revenueSplits: PropTypes.array.isRequired,

  // Properties passed down from the parent modal which go to the action button.
  modalActionProps: PropTypes.object.isRequired,

  // Set the content section on the parent modal.
  setContentSection: PropTypes.func.isRequired,

  // Determines if the user should be able to create new splits.
  canCreate: PropTypes.bool.isRequired,
};

export default RevenueSplitContainer;
