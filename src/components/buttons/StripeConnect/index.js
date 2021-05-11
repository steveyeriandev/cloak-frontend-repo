import React, { useState } from "react";
import PropTypes from "prop-types";
import { useToasts } from "react-toast-notifications";

import ProjectService from "features/projects/service";
import LoadingButton from "components/buttons/Loading";
import { openInNewTab } from "utils/general";

function StripeConnectButton({ project, ...props }) {
  /* Provides a button component to connect a project to a stripe account. */
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { addToast } = useToasts();

  async function connectAccount() {
    // Connects the account and then sends the user to Stripe to fill out their data.
    setErrorMessage();
    try {
      setIsLoading(true);
      const projectService = new ProjectService();
      const response = await projectService.connectAccount(project.id);
      openInNewTab(response.data.url);
    } catch (err) {
      addToast("Error connecting stripe account, try refreshing.", {
        appearance: "error",
      });
    }

    setIsLoading(false);
  }

  return (
    <div>
      <LoadingButton
        size="lg"
        className="mt-2"
        width={150}
        onClick={connectAccount}
        isLoading={isLoading}
        {...props}
      >
        {props.children}
      </LoadingButton>
      {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
    </div>
  );
}

StripeConnectButton.propTypes = {
  // The project that we're going to be connecting.
  project: PropTypes.object.isRequired,
};

export default StripeConnectButton;
