import React, { useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { navigate } from "@reach/router";

import { projectTemplate } from "utils/enums";
import ProjectTemplates from "components/projects/TemplateSection";
import CreateProjectForm from "components/forms/CreateProject";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

function ProjectCreateRoute() {
  // Provides a route for the project creation process.

  // TODO: For now, just create everything as live class.
  const [selectedTemplate, setSelectedTemplate] = useState(
    projectTemplate.liveClass
  );

  // TODO: For now, there is no template selection.
  const [activeSection, setActiveSection] = useState("projectForm");

  function renderSection() {
    // Shows a different section depending on where the user is in the process.
    if (activeSection === "chooseTemplate") {
      return (
        <>
          <Row>
            <Col className="text-center">
              <h4 className="m-5">
                Choose a template to pre-build your project based on your
                project type.
              </h4>
            </Col>
          </Row>
          <Row>
            <ProjectTemplates
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
            />
          </Row>
          <ButtonContainer className="mt-2">
            <Button
              size="lg"
              variant="light"
              onClick={() => navigate("/projects")}
            >
              <FontAwesomeIcon icon={faChevronLeft} /> Cancel
            </Button>
            <Button size="lg" onClick={() => setActiveSection("projectForm")}>
              Next <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </ButtonContainer>
        </>
      );
    } else if (activeSection === "projectForm") {
      return (
        <Row>
          <Col sm={12} md={{ span: 6, offset: 3 }}>
            <CreateProjectForm
              template={selectedTemplate}
              // backAction={() => setActiveSection('chooseTemplate')}
              backAction={() => navigate("/projects")}
              className="bg-white border p-5 rounded"
            />
          </Col>
        </Row>
      );
    }
  }

  return <Container className="my-5">{renderSection()}</Container>;
}

export default ProjectCreateRoute;
