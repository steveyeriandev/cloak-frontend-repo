import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";

import ProjectTile from "components/projects/Tile";
import LoadingContainer from "components/loading/Container";

function ProjectSearchRoute() {
  // Provides a route for the project creation process.
  const projectSearchState = useSelector((state) => state.projects.search);

  const { results, isLoading } = projectSearchState;

  function renderProjects() {
    if (results.length > 0) {
      return results.map((project) => (
        <Col md={3} key={project.id}>
          <ProjectTile project={project} />
        </Col>
      ));
    }

    return (
      <Col>
        <Alert variant="info" className="text-center mt-5">
          There are no projects that fit the current search.
        </Alert>
      </Col>
    );
  }

  if (results && results.length === 0 && isLoading) {
    return <LoadingContainer text="Finding projects..." />;
  }

  return (
    <Container>
      <Row>{renderProjects()}</Row>
    </Container>
  );
}

export default ProjectSearchRoute;
