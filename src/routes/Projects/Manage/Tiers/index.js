import React from "react";
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import { useModal } from "react-modal-hook";
import { useSelector } from "react-redux";

import InfoTooltip from "components/tooltips/Info";
import ManageFormTitle from "components/general/ActionHeader";
import PublicSettingsCard from "components/tiers/PublicSettingsCard";
import TierSettingsCard from "components/tiers/TierSettingsCard";
import BucketSettingsCol from "components/tiers/BucketSettingsCol";
import RegistrationTierModal from "components/modals/RegistrationTier";
import { getProjectType } from "utils/projects";
import { projectTemplate } from "utils/enums";

const TierBucketSettingsContainer = styled(Row)`
  display: flex;
`;

function ManageTiersRoute() {
  // Route to manage the the tiers and buckets of a project.
  const project = useSelector((state) => state.projects.detail);
  const [showTierModal, hideTierModal] = useModal(() => {
    return <RegistrationTierModal onHide={hideTierModal} />;
  });

  function renderTierCards() {
    return project.tiers.map((tier) => {
      return (
        <BucketSettingsCol key={tier.id}>
          <TierSettingsCard registrationTier={tier} />
        </BucketSettingsCol>
      );
    });
  }

  const headerTooltipText =
    getProjectType(project) === projectTemplate.liveClass
      ? `Tiers group users together and determine which buckets they can access. When a user pays for a
     class, they are registering for a tier.`
      : "Tiers group users together and determine which buckets they can access.";

  return (
    <div className="mt-4">
      <ManageFormTitle actionLabel="Add Tier" action={showTierModal}>
        Tier Settings
        <InfoTooltip id="tier" text={headerTooltipText} />
      </ManageFormTitle>
      <TierBucketSettingsContainer>
        <BucketSettingsCol>
          <PublicSettingsCard />
        </BucketSettingsCol>
        {renderTierCards()}
      </TierBucketSettingsContainer>
    </div>
  );
}

export default ManageTiersRoute;
