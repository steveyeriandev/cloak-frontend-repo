import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faLock } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import FormGroup from "components/forms/shared/FormGroup";
import InfoToolTip from "components/tooltips/Info";
import { updateProject } from "features/projects/thunks";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledCheck = styled(Form.Check)`
  input:hover {
    cursor: pointer !important;
  }
`;

function PublicToggle({ project, setPublicAction }) {
  // Provides a component to toggle if a project is public or private.
  const dispatch = useDispatch();

  const badge = project.isPublic ? (
    <span className="float-right">
      <Badge variant="primary">
        <FontAwesomeIcon icon={faCheck} /> Project is public
      </Badge>
    </span>
  ) : (
    <span>
      <Badge variant="dark">
        <FontAwesomeIcon icon={faLock} />
        &nbsp;Project is private
      </Badge>
    </span>
  );

  async function handleToggle() {
    // Toggle's the project's is public flag.
    const actionPayload = {
      projectId: project.id,
      payload: {
        isPublic: !project.isPublic,
      },
    };
    await dispatch(updateProject(actionPayload));

    // After the project has been made public, we should ask the user if they want to share the
    // project if they haven't already.
    if (!project.isPublic) setPublicAction();
  }

  return (
    <Wrapper>
      <FormGroup className="mb-0 d-inline">
        <StyledCheck
          type="switch"
          className="d-inline"
          id="project-public-toggle"
          label={
            <span>
              Make project public
              <InfoToolTip text="Private projects are only viewabled by collaborators/teachers" />
            </span>
          }
          checked={project.isPublic}
          onClick={handleToggle}
        />
      </FormGroup>
      {badge}
    </Wrapper>
  );
}

PublicToggle.propTypes = {
  // The project for which we're toggling.
  project: PropTypes.object.isRequired,

  // Action to take when setting the project as public.
  setPublicAction: PropTypes.func,
};

PublicToggle.defaultProps = {
  setPublicAction: () => {},
};

export default PublicToggle;
