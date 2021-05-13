import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useModal } from "react-modal-hook";

import EmptyActionSection from "components/general/EmptyActionSection";
import RegistrationTierModal from "components/modals/RegistrationTier";
import StripeConnectButton from "components/buttons/StripeConnect";
import SectionHeader from "components/general/SectionHeader";
import RegistrationTierPaymentSection from "components/tiers/PaymentSection";
import FormModal from "components/modals/Form";
import EmailForm from "components/forms/Email";
import { supportEmailUrl } from "features/emails/api";

function RegistrationSection({
  project,
  shouldViewAdminItems,
  actAsRegistrationTier,
}) {
  /* Renders the section on project info page for users to signup for a class. */

  // The registration tier objects the user has an active enrollment for.
  const user = useSelector((state) => state.account.user);
  const activeRegistrations = user.registrations;
  const activeRegistrationIds = activeRegistrations
    ? activeRegistrations.map((r) => r.id)
    : [];

  // An array of the ids for the registration tiers of this project.
  const classRegistrationIds = project.tiers.map((tier) => tier.id);

  const [showCreateTierModal, hideCreateTierModal] = useModal(() => {
    return <RegistrationTierModal onHide={hideCreateTierModal} />;
  });
  const [showSupportModal, hideSupportModal] = useModal(() => {
    return (
      <FormModal title="Contact us" onHide={hideSupportModal}>
        <EmailForm
          closeModal={hideSupportModal}
          email={{
            to: "support@radhowtoschool.com",
            subject: "Pay button approval",
          }}
          apiUrl={supportEmailUrl}
          toDisabled
        />
      </FormModal>
    );
  });

  function renderOwnerNotification() {
    /* Renders a notification alert for the owner to know what needs to be done to activate payment
       buttons.

       This follows a general progression of actions the owner takes to activate their registration
       tiers:

       1) Connect their account to Stripe
       2) Create registration tiers
       3) Ensure that all teachers are connected & payment split is correct
       4) Profit.
    */

    if (!user.isApproved)
      return (
        <Alert variant="white">
          You must be a verified user to create payment buttons.
          <Button
            variant="primary"
            block
            className="mt-3"
            onClick={showSupportModal}
          >
            <FontAwesomeIcon icon={faEnvelope} /> Contact Support
          </Button>
        </Alert>
      );

    if (user.account === null) {
      return (
        <Alert variant="info">
          You must connect your account to create payment buttons.
          <StripeConnectButton
            project={project}
            variant="light"
            block
            className="mt-3"
          >
            Connect now
          </StripeConnectButton>
        </Alert>
      );
    } else if (classRegistrationIds.length === 0)
      return (
        <EmptyActionSection
          tooltip="Add pay buttons to sell access to different buckets. Buckets are containers for user generated content from you and/or your audience. Once you create a bucket, it appears in the dropdown menu on the upper left of your project page. You can use them in a variety of different ways. See this link for examples."
          buttonText="Create Pay Button"
          buttonAction={showCreateTierModal}
        />
      );
  }

  // Before doing anything, let's check that the project is available to receive registrations.
  if (classRegistrationIds.length === 0) {
    return user.id !== project.owner ? null : (
      <div className="my-4 text-center">{renderOwnerNotification()}</div>
    );
  }

  function getShownTiers() {
    // Returns an array of the tiers that should be shown to the user.
    let showTiers = [];

    // First filter the tiers to only the ones that the user should be able to see.
    const visibleTiers = project.tiers.filter(
      (tier) => tier.isVisible === true
    );
    visibleTiers.forEach((tier) => {
      // Check if there are extra restrictions on the tier.
      if (!tier.requiresTier) showTiers.push(tier);
      else {
        // Check that the user has the restricted to tiers, or is acting as the required tier.
        if (
          actAsRegistrationTier &&
          actAsRegistrationTier === tier.requiresTier
        )
          showTiers.push(tier);
        else if (activeRegistrationIds.includes(tier.requiresTier))
          showTiers.push(tier);
      }
    });

    return showTiers;
  }

  function renderTiersSection() {
    /* Renders a list of the tiers that the user can enroll in, or a message that they're already
       enrolled.
    */
    return getShownTiers().map((tier) => (
      <RegistrationTierPaymentSection
        key={tier.id}
        className="mt-4 text-center"
        tier={tier}
        isEnrolled={activeRegistrationIds.includes(tier.id)}
        canEdit={shouldViewAdminItems}
      />
    ));
  }

  return (
    <>
      <SectionHeader className="pl-3 mt-4 mb-2">Register</SectionHeader>
      <Container>
        {renderTiersSection()}
        {shouldViewAdminItems && (
          <Button
            block
            variant="secondary"
            className="mt-5"
            onClick={showCreateTierModal}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Pay Button
          </Button>
        )}
      </Container>
    </>
  );
}

RegistrationSection.propTypes = {
  // The project that we're rending the registration tier section for.
  project: PropTypes.object.isRequired,

  // Determines if the user should be able to view the admin items.
  shouldViewAdminItems: PropTypes.bool.isRequired,

  // Fakes viewing as a different registration tier.
  actAsRegistrationTier: PropTypes.bool,
};

export default RegistrationSection;
