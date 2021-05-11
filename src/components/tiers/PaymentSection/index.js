import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useModal } from "react-modal-hook";

import RegistrationTierModal from "components/modals/RegistrationTier";
import RegistrationButton from "components/projects/registration/Button";

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 35px;

  &:hover {
    cursor: pointer;
  }
`;

function RegistrationTierPaymentSection({
  tier,
  isEnrolled,
  canEdit,
  ...props
}) {
  // Displays a payment button, title, and management items.

  const [showTierModal, hideTierModal] = useModal(() => {
    return (
      <RegistrationTierModal onHide={hideTierModal} registrationTier={tier} />
    );
  }, [tier]);

  // If the tier is invalid and user should not see it, then return null.
  if (!tier.canReceivePayments && !canEdit) return null;

  return (
    <div key={tier.id} {...props}>
      <p className="font-weight-bold mb-1 d-relative">
        {tier.title}{" "}
        {canEdit && (
          <StyledFontAwesomeIcon icon={faPencilAlt} onClick={showTierModal} />
        )}
      </p>
      {isEnrolled ? (
        <Button disabled block variant="secondary">
          Enrolled
        </Button>
      ) : (
        <RegistrationButton
          tier={tier}
          variant="primary"
          showInvalid={!canEdit}
        />
      )}
    </div>
  );
}

RegistrationTierPaymentSection.propTypes = {
  // The tier that we're rendering the payment section for.
  tier: PropTypes.object.isRequired,

  // Determines if the user is currently enrolled in the tier.
  isEnrolled: PropTypes.bool,

  // Determines if the user is able to edit the registration tier.
  canEdit: PropTypes.bool,
};

RegistrationTierPaymentSection.defaultProps = {
  isEnrolled: false,
  canEdit: false,
};

export default RegistrationTierPaymentSection;
