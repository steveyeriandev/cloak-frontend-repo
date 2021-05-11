import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import BucketSlot from "components/tiers/BucketSlot";
import ButtonContainer from "components/forms/shared/ButtonContainer";
import BucketForm from "components/forms/Bucket";
import { updateBucket } from "features/buckets/thunks";
import ModalHeader from "../Header";
import ModalSubheader from "../Subheader";
import BaseModal from "../Base";

function TierBucketsModal({ registrationTier, ...props }) {
  // Allows the user to select which buckets are in a tier.
  const project = useSelector((state) => state.projects.detail);
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [activeSection, setActiveSection] = useState("chooseBuckets");

  // The bucket id that is updating.
  const [bucketIdUpdating, setBucketIdUpdating] = useState(null);

  async function handleBucketClick(bucket, isSelected) {
    /* Toggle if the bucket is selected for the given registration tier.

       :param bucket object: The bucket that is being toggled.
       :param isSelected bool: If the bucket is currently selected.
    */
    setBucketIdUpdating(bucket.id);

    const updatedTiers = isSelected
      ? bucket.registrationTiers.filter(
          (tierId) => tierId !== registrationTier.id
        )
      : bucket.registrationTiers.concat(registrationTier.id);

    let actionPayload = {
      bucketId: bucket.id,
      payload: { registrationTiers: updatedTiers },
    };

    // If we're selecting a bucket in a tier, then it should be marked as not public.
    if (!isSelected) actionPayload.payload.isPublic = false;

    const action = await dispatch(updateBucket(actionPayload));
    if (action.type === "UPDATE_BUCKET/rejected")
      addToast("Error updating bucket", { appearance: "error" });

    setBucketIdUpdating(null);
  }

  function renderBuckets() {
    // Renders all the buckets for the project so that hte user can select which to show.
    return project.buckets.map((bucket) => {
      const selectedBucketIds = registrationTier.buckets.map(
        (bucket) => bucket.id
      );
      const isSelected = selectedBucketIds.includes(bucket.id);
      const isLoading = bucketIdUpdating === bucket.id;

      return (
        <BucketSlot
          key={bucket.id}
          bucket={bucket}
          selected={isSelected}
          isLoading={isLoading}
          onClick={() => handleBucketClick(bucket, isSelected)}
        />
      );
    });
  }

  function renderContent() {
    // Render the main body based on our active section.
    if (activeSection === "chooseBuckets") {
      return (
        <>
          <ModalHeader title="Choose Buckets" />
          <ModalSubheader>
            Selected for the <b>{registrationTier.title}</b> users
          </ModalSubheader>
          <Modal.Body>
            {renderBuckets()}
            <ButtonContainer className="mt-3 justify-content-between">
              <Button
                variant="white"
                onClick={() => setActiveSection("createBucket")}
              >
                <FontAwesomeIcon icon={faPlusCircle} /> Create new bucket
              </Button>
              <Button onClick={props.onHide}>
                <FontAwesomeIcon icon={faCheckCircle} /> Done
              </Button>
            </ButtonContainer>
          </Modal.Body>
        </>
      );
    } else if (activeSection === "createBucket") {
      return (
        <>
          <ModalHeader title="Create bucket" />
          <ModalSubheader>
            The new bucket will be viewable to <b>{registrationTier.title}</b>{" "}
            users.
          </ModalSubheader>
          <Modal.Body>
            <BucketForm
              bucket={{
                registrationTiers: [registrationTier.id],
                isPublic: false,
              }}
              backAction={() => setActiveSection("chooseBuckets")}
              closeModal={props.onHide}
            />
          </Modal.Body>
        </>
      );
    }
  }

  return <BaseModal {...props}>{renderContent()}</BaseModal>;
}

TierBucketsModal.propTypes = {
  // The registration tier for which we're choosing buckets.
  registrationTier: PropTypes.object.isRequired,
};

export default TierBucketsModal;
