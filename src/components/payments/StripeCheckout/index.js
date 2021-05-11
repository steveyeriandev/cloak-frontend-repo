import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import PropTypes from "prop-types";
import { useToasts } from "react-toast-notifications";
import { useModal } from "react-modal-hook";
import { useSelector } from "react-redux";
import ReactPixel from "react-facebook-pixel";

import AuthenticationModal from "components/modals/Authentication";
import LoadingButton from "components/buttons/Loading";
import { baseUrl, axiosInstance } from "features/api";
import { stipeAccountType } from "utils/enums";

const stripePublishableKey =
  process.env.REACT_APP_ENV === "production"
    ? "pk_live_51HyiKMEGuiXMu7rLranL0qRyMPh2pR1X7fNhsxGpX4xHBBZREBlJr2wcAymVHRNyjtsWoqdjYDBPeHtEGehjLJ0C00EeL1jsiG"
    : "pk_test_51HyiKMEGuiXMu7rLwxVjVbqXE3mpRSa7LYYBFUh2b33ayuac6Wn9LtJcO9cylp3VXjApBGPMmK3yjhlNdQardpti00Y20oX39H";

function StripeCheckout({ tier, ...props }) {
  // Stripe checkout component
  // https://stripe.com/docs/checkout/integration-builder
  const { addToast } = useToasts();
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.token !== "");
  const [showAuthModal, hideAuthModal] = useModal(() => (
    <AuthenticationModal show={true} onHide={hideAuthModal} />
  ));

  // Check if we should use a connected account or the platform account.
  let stripePromiseOptions = {};
  const { account } = tier.project;
  if (
    account &&
    account.accountId &&
    account.type === stipeAccountType.standard
  ) {
    stripePromiseOptions["stripeAccount"] = account.accountId;
  }
  const stripePromise = loadStripe(stripePublishableKey, stripePromiseOptions);

  const handleError = (errorMessage) => {
    setRegistrationLoading(false);
    addToast(errorMessage, {
      appearance: "error",
      autoDismiss: true,
    });
  };

  const handleClick = async () => {
    /* Creates the checkout session with stripe, and then takes the user to checkout or shows them
       some error message if the checkout session was not able to be created.
    */
    if (!isAuthenticated) return showAuthModal();

    setRegistrationLoading(true);
    const stripeSessionUrl = `${baseUrl}registration-tiers/${tier.id}/create_payment_session/`;

    let stripe;
    try {
      stripe = await stripePromise;
    } catch (e) {
      handleError("Error processing payment, please try again later.");
    }

    try {
      const response = await axiosInstance.post(stripeSessionUrl);

      ReactPixel.track("InitiateCheckout", {
        currency: "USD",
        value: parseFloat(tier.price),
      });

      const redirectResult = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (redirectResult.error) {
        handleError(redirectResult.error);
      }
    } catch (e) {
      if (e && e.response && e.response.data && e.response.data.detail) {
        handleError(e.response.data.detail);
      } else {
        handleError(e.toString());
      }
    }
  };

  return (
    <LoadingButton
      isLoading={registrationLoading}
      onClick={handleClick}
      {...props}
    >
      {props.children}
    </LoadingButton>
  );
}

StripeCheckout.propTypes = {
  tier: PropTypes.object,
};

export default StripeCheckout;
