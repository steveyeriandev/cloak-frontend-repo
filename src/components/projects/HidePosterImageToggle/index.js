import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import FormGroup from "components/forms/shared/FormGroup";
import { updateProject } from "features/projects/thunks";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledCheck = styled(Form.Check)`
  input:hover {
    cursor: pointer !important;
  }
`;

function HidePosterImageToggle({ project }) {
  // Provides a component to toggle if a project's poster image is shown on the info page.

  const dispatch = useDispatch();

  async function handleToggle() {
    // Toggle's the project's is public flag.
    const actionPayload = {
      projectId: project.id,
      payload: {
        hidePosterImage: !project.hidePosterImage,
      },
    };
    await dispatch(updateProject(actionPayload));
  }

  return (
    <Wrapper>
      <FormGroup className="mb-0 d-inline">
        <StyledCheck
          type="switch"
          className="d-inline"
          id="project-hide-image-toggle"
          label="Hide poster image on this page"
          checked={project.hidePosterImage}
          onClick={handleToggle}
        />
      </FormGroup>
    </Wrapper>
  );
}

HidePosterImageToggle.propTypes = {
  // The project for which we're toggling.
  project: PropTypes.object.isRequired,
};

export default HidePosterImageToggle;
