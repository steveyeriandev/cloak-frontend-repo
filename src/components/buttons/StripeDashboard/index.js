import React, { useState } from "react";
import PropTypes from "prop-types";

import ProjectService from "features/projects/service";
import LoadingButton from "components/buttons/Loading";
import { openInNewTab } from "utils/general";

function StripeDashboardButton({ project, ...props }) {
  /* Provides a button component to connect a project to a stripe account. */
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  async function navigateToDashboard() {
    // Navigates the user to their stripe dashboard.
    setIsLoading(true);
    const projectService = new ProjectService();

    try {
      const response = await projectService.getStripeDashboard(project.id);
      openInNewTab(response.data.url);
    } catch (err) {
      setErrorMessage(
        "Error getting stripe dashboard link, please try again later."
      );
    }

    setIsLoading(false);
  }

  return (
    <div>
      <LoadingButton
        size="lg"
        className="mt-2"
        width={200}
        onClick={navigateToDashboard}
        isLoading={isLoading}
        {...props}
      >
        {props.children}
      </LoadingButton>
      {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
    </div>
  );
}

StripeDashboardButton.propTypes = {
  // The project that we're going to be navigating to its dashboard.
  project: PropTypes.object.isRequired,
};

export default StripeDashboardButton;
