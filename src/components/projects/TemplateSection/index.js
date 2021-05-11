import React from "react";
import PropTypes from "prop-types";
import {
  faGraduationCap,
  faDragon,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";

import TemplateSelection from "components/projects/TemplateSelection";
import { projectTemplate } from "utils/enums";

function ProjectTemplateSection({ selectedTemplate, setSelectedTemplate }) {
  // Provides a section for the user to choose a project template.

  const templates = [
    {
      title: "Live class",
      value: projectTemplate.liveClass,
      icon: faGraduationCap,
    },
    {
      title: "Animation project",
      value: projectTemplate.animationProject,
      icon: faDragon,
    },
    {
      title: "Blank project",
      value: null,
      icon: faTools,
    },
  ];

  function renderTemplates() {
    // Renders each of the templates that the user can choose from.
    return templates.map((template) => (
      <Col key={template.title} sm={12} md={4} className="mb-4">
        <TemplateSelection
          template={template}
          selected={template.value === selectedTemplate}
          onClick={() => setSelectedTemplate(template.value)}
        />
      </Col>
    ));
  }

  return renderTemplates();
}

ProjectTemplateSection.propTypes = {
  // The template that is currently selected.
  selectedTemplate: PropTypes.string,

  // Function to set the selected template in the parent component.
  setSelectedTemplate: PropTypes.func,
};

export default ProjectTemplateSection;
