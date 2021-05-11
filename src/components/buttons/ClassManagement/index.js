import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { navigate } from "@reach/router";

import { getProjectDescriptor, getProjectManagementUrl } from "utils/projects";

const Text = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  display: inline-block;
  margin-bottom: -4px;
`;

function ClassManagementButton({ project, ...props }) {
  // Provides a navigation button to go to class management.
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => navigate(getProjectManagementUrl(project))}
      {...props}
    >
      <Text>
        <FontAwesomeIcon icon={faCog} /> {getProjectDescriptor(project)}{" "}
        Management
      </Text>
    </Button>
  );
}

ClassManagementButton.propTypes = {
  // The project that we're rendering the class management button for.
  project: PropTypes.object.isRequired,
};

export default ClassManagementButton;
