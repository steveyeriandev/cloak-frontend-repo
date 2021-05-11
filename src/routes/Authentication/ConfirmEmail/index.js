import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { axiosInstance, baseUrl } from "features/api";
import { useToasts } from "react-toast-notifications";
import { navigate } from "@reach/router";

import LoadingContainer from "components/loading/Container";

function ConfirmEmailRoute({ emailKey }) {
  const { addToast } = useToasts();

  useEffect(() => {
    async function verifyEmail() {
      const url = `${baseUrl}auth/confirm-email/`;
      try {
        await axiosInstance.post(url, { key: emailKey });
        addToast("Your email has been verified, you may now log in.", {
          appearance: "success",
          autoDismiss: true,
        });
        navigate("/");
      } catch (e) {}
    }

    verifyEmail();
  }, [addToast, emailKey]);

  return <LoadingContainer />;
}

ConfirmEmailRoute.propTypes = {
  // Key that is received in email to confirm account email.
  key: PropTypes.string,
};

export default ConfirmEmailRoute;
