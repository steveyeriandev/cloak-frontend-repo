import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
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

function PublicBucketsModal({ project, ...props }) {
  // Allows the user to select which buckets should be public for a project.
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  // The bucket id that is updating.
  const [bucketIdUpdating, setBucketIdUpdating] = useState(null);
  const [activeSection, setActiveSection] = useState("chooseBuckets");

  async function handleBucketClick(bucket, isPublic) {
    /* Toggle if the bucket is public for the given project.

       :param bucket object: The bucket that is being toggled.
       :param isPublic bool: If the bucket is currently selected.
    */
    setBucketIdUpdating(bucket.id);

    let actionPayload = {
      bucketId: bucket.id,
      payload: { isPublic: !isPublic },
    };

    // If we're setting a bucket to public, it should be removed from the previous registration
    // tiers.
    if (!isPublic) actionPayload.payload.registrationTiers = [];

    const action = await dispatch(updateBucket(actionPayload));
    if (action.type === "UPDATE_BUCKET/rejected")
      addToast("Error updating bucket", { appearance: "error" });

    setBucketIdUpdating(null);
  }

  function renderBuckets() {
    // Renders all the buckets for the project so that hte user can select which to show.
    const publicBuckets = project.buckets
      .filter((bucket) => bucket.isPublic)
      .map((bucket) => bucket.id);

    return project.buckets.map((bucket) => {
      const isPublic = publicBuckets.includes(bucket.id);
      const isLoading = bucketIdUpdating === bucket.id;

      return (
        <BucketSlot
          key={bucket.id}
          bucket={bucket}
          selected={isPublic}
          isLoading={isLoading}
          onClick={() => handleBucketClick(bucket, isPublic)}
        />
      );
    });
  }

  function renderContent() {
    if (activeSection === "chooseBuckets") {
      return (
        <>
          <ModalHeader title="Choose Public Buckets" />
          <ModalSubheader>
            Public buckets are viewable by anyone in the project
          </ModalSubheader>
          <Modal.Body>
            {renderBuckets()}
            <ButtonContainer className="mt-3 justify-content-between">
              <Button
                variant="white"
                onClick={() => setActiveSection("createBucket")}
              >
                <FontAwesomeIcon icon={faPlusCircle} /> Create new public bucket
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
          <ModalHeader title="Create Public Bucket" />
          <ModalSubheader>
            New bucket will be visible to all users in the project
          </ModalSubheader>
          <Modal.Body>
            <BucketForm
              bucket={{ registrationTiers: [], isPublic: true }}
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

PublicBucketsModal.propTypes = {
  // The project for which we're choosing public buckets.
  project: PropTypes.object.isRequired,
};

export default PublicBucketsModal;
