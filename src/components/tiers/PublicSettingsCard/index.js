import React from "react";
import { useSelector } from "react-redux";
import { useModal } from "react-modal-hook";

import BucketSlot from "components/tiers/BucketSlot";
import TierBucketsCard from "components/cards/TierBuckets";
import TierBucketCardBody from "components/cards/TierBuckets/Body";
import TierBucketCardTitle from "components/cards/TierBuckets/Title";
import InfoTooltip from "components/tooltips/Info";
import TierBucketSettingButton from "components/buttons/TierBucketSetting";
import PublicBucketsModal from "components/modals/PublicBuckets";
import useEditRegistrationTier from "hooks/EditRegistrationTier";

function PublicSettingsCard() {
  // Displays the public bucket settings for a project.
  const project = useSelector((state) => state.projects.detail);
  const publicBuckets = project.buckets.filter((bucket) => bucket.isPublic);
  const setSelectedBucket = useEditRegistrationTier();

  const [showPublicTierModal, hidePublicTierModal] = useModal(() => {
    return (
      <PublicBucketsModal project={project} onHide={hidePublicTierModal} />
    );
  }, [project]);

  function renderBuckets() {
    /* For the public view section, we need to return all the buckets that are public as well as the
       main project info "bucket", which is not actually a bucket but is displayed as such.
    */
    let publicBucketSlots = publicBuckets
      .filter((bucket) => bucket.isPublic)
      .map((bucket) => {
        return (
          <BucketSlot
            key={bucket.id}
            bucket={bucket}
            onClick={() => setSelectedBucket(bucket)}
          />
        );
      });

    return publicBucketSlots;
  }

  return (
    <TierBucketsCard className="bg-transparent">
      <TierBucketCardTitle className="m-3">
        Public Tier (free)
        <InfoTooltip
          id="public view"
          text="Public buckets are viewable by anyone who is viewing the project."
        />
      </TierBucketCardTitle>
      <TierBucketCardBody className="border-top">
        {renderBuckets()}
        <TierBucketSettingButton onClick={showPublicTierModal} />
      </TierBucketCardBody>
    </TierBucketsCard>
  );
}

export default PublicSettingsCard;
