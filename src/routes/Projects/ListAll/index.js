import React, { useEffect, useState } from "react";
import ProjectList from "components/projects/List";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "features/projects/thunks";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import LoadingContainer from "components/loading/Container";
import { projectTemplate } from "utils/enums";

function AllProjectsRoute() {
  // Show all the projects and allow the user to browse into them.
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const projectEntities = useSelector((state) => state.projects.entities);
  const { classes, recordings } = projectEntities;

  useEffect(() => {
    async function _fetchProjects() {
      // Fetch the projects that should be on the home featured screen.

      await Promise.all([
        dispatch(
          fetchProjects({
            params: {
              isFeatured: true,
              template: projectTemplate.liveClass,
              hasRecordings: false,
            },
          })
        ),
        dispatch(
          fetchProjects({
            params: {
              isFeatured: true,
              hasRecordings: true,
            },
          })
        ),
      ]);

      setIsLoading(false);
    }

    setIsLoading(true);
    _fetchProjects();
  }, []);

  if (isLoading) return <LoadingContainer text="Loading projects" />;

  return (
    <Container>
      <Row>
        <Col>
          <ProjectList projects={classes || []} title="Classes" />
          <ProjectList projects={recordings || []} title="Recordings" />
        </Col>
      </Row>
    </Container>
  );
}

export default AllProjectsRoute;
