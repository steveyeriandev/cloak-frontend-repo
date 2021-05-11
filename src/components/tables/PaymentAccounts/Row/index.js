import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import StripeConnectButton from "components/buttons/StripeConnect";
import StripeDashboardButton from "components/buttons/StripeDashboard";

import { getFullName } from "utils/users";

function PaymentAccountRow({ user }) {
  // Returns a row for the user table.
  const authenticatedUser = useSelector((state) => state.account.user);
  const project = useSelector((state) => state.projects.detail);
  const { account } = user;

  function renderStripeAction() {
    const buttonProps = {
      size: "sm",
      project,
    };

    if (user.id === authenticatedUser.id) {
      return account && account.payoutsEnabled ? (
        <StripeDashboardButton {...buttonProps}>
          Stripe Dashboard <FontAwesomeIcon icon={faExternalLinkAlt} />
        </StripeDashboardButton>
      ) : (
        <StripeConnectButton {...buttonProps}>
          Connect <FontAwesomeIcon icon={faExternalLinkAlt} />
        </StripeConnectButton>
      );
    }
  }

  return (
    <tr>
      <td>{getFullName(user)}</td>
      <td>
        {account && account.payoutsEnabled ? (
          <FontAwesomeIcon icon={faCheckCircle} color="green" />
        ) : (
          <FontAwesomeIcon icon={faTimesCircle} color="red" />
        )}
      </td>
      <td>{renderStripeAction()}</td>
    </tr>
  );
}

PaymentAccountRow.propTypes = {
  // The user instance that we're rendering a row for.
  user: PropTypes.object.isRequired,
};

export default PaymentAccountRow;
