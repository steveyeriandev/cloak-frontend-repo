import React, { useState, useEffect } from "react";
import { useModal } from "react-modal-hook";

import FormModal from "components/modals/Form";
import BucketForm from "components/forms/Bucket";

function useEditRegistrationTier() {
  // Provides common functionality for bringing up the modal to edit a registration tier.

  const [selectedBucket, setSelectedBucket] = useState(null);

  const [showBucketModal, hideBucketModal] = useModal(() => {
    function hideModal() {
      setSelectedBucket(null);
      hideBucketModal();
    }

    function _getDefaultBucketProps() {
      // The default bucket props when creating a bucket needs to pass in the registration tier.
      return selectedBucket && selectedBucket.registrationTier
        ? {
            registrationTiers: [selectedBucket.registrationTier.id],
            isPublic: false,
          }
        : {
            isPublic: true,
          };
    }

    return (
      <FormModal onHide={hideModal}>
        <BucketForm
          closeModal={hideModal}
          bucket={selectedBucket ? selectedBucket : _getDefaultBucketProps()}
        />
      </FormModal>
    );
  }, [selectedBucket]);

  useEffect(() => {
    // Show the bucket modal based on state change.
    // https://stackoverflow.com/questions/53898810/executing-async-code-on-update-of-state-with-react-hooks

    if (selectedBucket) showBucketModal();
  }, [selectedBucket, showBucketModal]);

  return setSelectedBucket;
}

export default useEditRegistrationTier;
