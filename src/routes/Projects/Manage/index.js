import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import { navigate } from "@reach/router";

import LoadingContainer from "components/loading/Container";
import { fetchProjectEnrollments } from "features/projects/thunks";
import ClassManagementNavigation from "components/navbars/ClassManagement";
import { isProjectAdmin } from "utils/projects";

const Wrapper = styled.div`
  padding-top: 50px;
`;

function ProjectManageRoute(props) {
  /* Base route that allows a user to manage their settings and data of a project. Each of the
     sections in the management dashboard are sub-routes of this parent one.
  */
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.detail);
  const user = useSelector((state) => state.account.user);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEnrollments() {
      setLoading(true);
      await dispatch(fetchProjectEnrollments(project.id));
      setLoading(false);
    }

    // Check that the user is authenticated and is an admin.
    if (!isProjectAdmin(user, project)) navigate("/");

    fetchEnrollments();
  }, [dispatch, project.id]);

  if (isLoading) return <LoadingContainer />;

  return (
    <Wrapper className="project-manage-route pb-4">
      <ClassManagementNavigation project={project} />
      <Container>{props.children}</Container>
    </Wrapper>
  );
}

export default ProjectManageRoute;
