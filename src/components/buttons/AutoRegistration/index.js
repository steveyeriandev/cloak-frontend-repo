import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "react-modal-hook";
import { useToasts } from "react-toast-notifications";

import LoadingButton from "components/buttons/Loading";
import AuthenticationModal from "components/modals/Authentication";
import { autoRegister } from "features/tiers/thunks";
import { enrollmentStatus } from "utils/enums";

function AutoRegistrationButton({ registrationTier }) {
  // Automatically registers a user for a given registration tier.

  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.token !== "");
  const user = useSelector((state) => state.account.user);
  const [showAuthModal, hideAuthModal] = useModal(() => (
    <AuthenticationModal onHide={hideAuthModal} />
  ));
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  async function handleClick() {
    if (!isAuthenticated) return showAuthModal();

    setIsLoading(true);

    try {
      const action = await dispatch(
        autoRegister({ registrationTierId: registrationTier.id })
      );
      if (action.type === "AUTO_REGISTER/fulfilled") {
        addToast("Registered successfully!", { appearance: "success" });
      } else {
        let errorMessage = "Error registering, try again later.";
        if (action.payload && action.payload.data && action.payload.data.detail)
          errorMessage = action.payload.data.detail;
        addToast(errorMessage, { appearance: "error" });
      }
    } catch (err) {
      addToast("Error during registration", { appearance: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  // Check if  the user is currently enrolled in this free tier.
  const activeEnrollments = !user.enrollments
    ? []
    : user.enrollments.filter(
        (enrollment) => enrollment.status === enrollmentStatus.active
      );
  const isEnrolled = activeEnrollments
    .map((enrollment) => {
      return enrollment.registrationTier.id;
    })
    .includes(registrationTier.id);
  const buttonDisabled = isEnrolled || !registrationTier.hasAvailability;
  const variant = buttonDisabled ? "dark" : "primary";

  function getTierButtonText() {
    if (isEnrolled) return "Enrolled";

    if (!registrationTier.hasAvailability) return "Sold out";

    return "Free";
  }

  return (
    <LoadingButton
      block
      isLoading={isLoading}
      variant={variant}
      onClick={handleClick}
      disabled={buttonDisabled}
    >
      {getTierButtonText()}
    </LoadingButton>
  );
}

AutoRegistrationButton.propTypes = {
  // The registration tier that the user would be registered for.
  registrationTier: PropTypes.object.isRequired,
};

export default AutoRegistrationButton;
