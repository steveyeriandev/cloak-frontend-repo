import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { navigate } from "@reach/router";
import { useSelector } from "react-redux";

import AutoRegistrationButton from "components/buttons/AutoRegistration";
import StripeCheckout from "components/payments/StripeCheckout";
import { getProjectBaseUrl } from "utils/projects";

function RegistrationButton({ tier, variant }) {
  /* Renders the registration button based on the tier data. */
  const project = useSelector((state) => state.projects.detail);

  const isDisabled =
    moment(tier.registrationEndDate).isBefore() ||
    moment(tier.registrationStartDate).isAfter() ||
    !tier.hasAvailability;

  // Take the variant passed in unless it's disabled.
  function getButtonText() {
    if (moment(tier.registrationEndDate).isBefore()) return "Closed";
    else if (moment(tier.registrationStartDate).isAfter()) return "Coming soon";
    else if (!tier.hasAvailability) return "Sold out";
    else return `$${tier.price}`;
  }

  if (tier.price === null || parseFloat(tier.price) === 0.0) {
    // For free tiers, we need to assign the tier directly instead of asking for payment.
    return <AutoRegistrationButton registrationTier={tier} />;
  }

  if (!tier.canReceivePayments) {
    // Only show the admins the button if it can't receive payments.
    const paymentsUrl = `${getProjectBaseUrl(project)}/manage/payments`;
    return (
      <Button variant="danger" block onClick={() => navigate(paymentsUrl)}>
        <FontAwesomeIcon icon={faExclamationCircle} /> Invalid payment setup
      </Button>
    );
  }

  return (
    <StripeCheckout
      className="w-100"
      tier={tier}
      variant={isDisabled ? "dark" : variant}
      disabled={isDisabled}
    >
      {getButtonText()}
    </StripeCheckout>
  );
}

RegistrationButton.propTypes = {
  // The tier that we're rending the registration button for.
  tier: PropTypes.object.isRequired,

  // The registration button can have different types of style variants.
  variant: PropTypes.string,
};

export default RegistrationButton;
