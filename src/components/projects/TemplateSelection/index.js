import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TemplateItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  transition: 0.3s ease background-color;

  ${({ theme, selected }) =>
    selected &&
    `
    background-color: ${theme.primary};
  `}

  &:hover {
    cursor: pointer;
  }
`;

function TemplateSelection({ template, selected, ...props }) {
  // Provides an individual section to show as a project template.
  return (
    <TemplateItem selected={selected} className="p-5 border rounded" {...props}>
      <FontAwesomeIcon icon={template.icon} size="2x" className="mb-2" />
      <p className="mb-0">{template.title}</p>
    </TemplateItem>
  );
}

TemplateSelection.propTypes = {
  // The template data that should be rendered.
  template: PropTypes.shape({
    icon: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,

  // Determines if the item is currently selected.
  selected: PropTypes.bool,
};

TemplateSelection.defaultProps = {
  selected: false,
};

export default TemplateSelection;
