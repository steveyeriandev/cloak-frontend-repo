import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useModal } from "react-modal-hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import TierBucketsCard from "components/cards/TierBuckets";
import TierBucketCardBody from "components/cards/TierBuckets/Body";
import TierBucketCardTitle from "components/cards/TierBuckets/Title";
import RegistrationTierModal from "components/modals/RegistrationTier";
import TierBucketSettingButton from "components/buttons/TierBucketSetting";
import TierBucketsModal from "components/modals/TierBuckets";
import useEditRegistrationTier from "hooks/EditRegistrationTier";
import BucketSlot from "../BucketSlot";

const ClickableFontAwesomeIcon = styled(FontAwesomeIcon)`
  &:hover {
    cursor: pointer;
  }
`;

const EditIconContainer = styled.div`
  display: inline;
  margin-left: 3px;
  padding: 3px 9px;
  background-color: ${(props) => props.theme.gray100};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const StyledTierBucketCardTitle = styled(TierBucketCardTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function TierSettingsCard({ registrationTier }) {
  // Displays the card to edit a registration tier and its buckets in the tier settings.
  const setSelectedBucket = useEditRegistrationTier();

  const [showTierModal, hideTierModal] = useModal(() => {
    return (
      <RegistrationTierModal
        onHide={hideTierModal}
        registrationTier={registrationTier}
      />
    );
  }, [registrationTier]);

  const [showTierBucketsModal, hideTierBucketsModal] = useModal(() => {
    return (
      <TierBucketsModal
        onHide={hideTierBucketsModal}
        registrationTier={registrationTier}
      />
    );
  }, [registrationTier]);

  function renderBuckets() {
    return registrationTier.buckets.map((bucket) => (
      <BucketSlot
        key={bucket.id}
        bucket={bucket}
        onClick={() => setSelectedBucket(bucket)}
      />
    ));
  }

  return (
    <TierBucketsCard>
      <StyledTierBucketCardTitle>
        <span>
          {registrationTier.title}
          <span className="text-muted ml-1">
            {registrationTier.price
              ? `$${parseInt(registrationTier.price)}`
              : "Free"}
          </span>
        </span>
        <EditIconContainer>
          <ClickableFontAwesomeIcon
            hover
            icon={faPencilAlt}
            onClick={showTierModal}
          />
        </EditIconContainer>
      </StyledTierBucketCardTitle>
      <TierBucketCardBody className="border-top">
        {renderBuckets()}
        <TierBucketSettingButton onClick={showTierBucketsModal} />
      </TierBucketCardBody>
    </TierBucketsCard>
  );
}

TierSettingsCard.propTypes = {
  // The registration tier object that we're modifying buckets for.
  registrationTier: PropTypes.object.isRequired,
};

export default TierSettingsCard;
