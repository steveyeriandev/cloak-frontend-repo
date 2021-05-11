import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";

import { fetchProject } from "features/projects/thunks";
import { setCurrentBucket } from "features/buckets/slice";
import LoadingContainer from "components/loading/Container";
import usePrevious from "hooks/Previous";

function ProjectDetailRoute({ projectId, children }) {
  /* This is the main route to show a project's detail, which then has sub-routes to display each
     individual bucket.
  */
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const projectState = useSelector((state) => state.projects);
  const isAuthenticated = useSelector((state) => state.account.token !== "");
  const prevAuthenticated = usePrevious(isAuthenticated);

  useEffect(() => {
    // Get the project detail if we don't already have it, or if we've just logged in.
    async function _fetchProject() {
      const action = await dispatch(fetchProject(projectId));
      if (action.type === "FETCH_PROJECT/rejected")
        setError("Error loading project, please try again later.");
    }

    dispatch(setCurrentBucket({}));

    if (
      projectState.detail.id !== parseInt(projectId) ||
      (isAuthenticated && prevAuthenticated === false)
    ) {
      if (!projectState.isLoading && !error) _fetchProject();
    }
  }, [
    dispatch,
    projectId,
    projectState.detail.id,
    isAuthenticated,
    prevAuthenticated,
    projectState.isLoading,
    error,
  ]);

  const project = projectState.detail;

  if (error)
    return (
      <Alert variant="danger" className="m-5">
        {error}
      </Alert>
    );

  if (projectState.isLoading || project.id !== parseInt(projectId)) {
    return <LoadingContainer text="Loading project" />;
  }

  return <div className="project-route h-100">{children}</div>;
}

ProjectDetailRoute.propTypes = {
  // Identifier of the project that we're rendering here.
  projectSlug: PropTypes.string,
};

export default ProjectDetailRoute;
