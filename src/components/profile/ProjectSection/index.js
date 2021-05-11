import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SectionHeader from "components/general/SectionHeader";
import ProfileProjectTile from "../ProjectTile";

function ProfileProjectSection({ projects, header }) {
  // Renders a project section in a user's profile.

  if (projects.length === 0) return null;

  function renderProjectTiles() {
    // In the projects section of the profile, the projects should be shown.
    return projects.map((project) => {
      return (
        <Col sm={4} key={project.id}>
          <ProfileProjectTile project={project} />
        </Col>
      );
    });
  }

  return (
    <>
      <SectionHeader>{header}</SectionHeader>
      <Row>{renderProjectTiles()}</Row>
    </>
  );
}

ProfileProjectSection.propTypes = {
  // The projects that should be rendered
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  header: PropTypes.object.isRequired,
};

export default ProfileProjectSection;
