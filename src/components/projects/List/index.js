import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ProjectTile from "../Tile";

function ProjectList({ projects, title }) {
  // Component to display a list of project tile components in a horizontal scrolling design.

  function renderProjects() {
    if (!projects.length) {
      return (
        <div className="p-5 w-100 bg-white border rounded text-center">
          <h4>No projects available</h4>
        </div>
      );
    }

    // Take in the projects passed into the list component and render each tile.
    return projects.map((project, i) => (
      <Col sm={3} key={project.id}>
        <ProjectTile project={project} />
      </Col>
    ));
  }

  return (
    <div className="project-list my-4">
      <h2>{title}</h2>
      <Row noGutters>{renderProjects()}</Row>
    </div>
  );
}

ProjectList.propTypes = {
  projects: PropTypes.array,
  title: PropTypes.string,
};

export default ProjectList;
