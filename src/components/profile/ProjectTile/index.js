import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import { navigate } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import { getProjectUrl } from "utils/projects";
import DefaultProjectPoster from "images/project-generic.jpg";

const Wrapper = styled.div`
  position: relative;
`;

const StyledImage = styled(Image)`
  transition: 0.3s ease all;

  &:hover {
    cursor: pointer;
    box-shadow: ${(props) => props.theme.shadow};
  }
`;

const PrivateBanner = styled.div`
  background-color: black;
  opacity: 0.8;
  color: white;
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
  padding: ${(props) => props.theme.spacing};
  border-top-left-radius: ${(props) => props.theme.borderRadius};
  border-top-right-radius: ${(props) => props.theme.borderRadius};
`;

function ProfileProjectTile({ project }) {
  function handleNavigate() {
    navigate(getProjectUrl(project));
  }

  return (
    <Wrapper>
      <StyledImage
        fluid
        rounded
        src={project.image || DefaultProjectPoster}
        className="mb-2 border"
        onClick={handleNavigate}
      />
      {!project.isPublic && (
        <PrivateBanner>
          <FontAwesomeIcon icon={faLock} /> Private
        </PrivateBanner>
      )}
      <p>{project.title}</p>
    </Wrapper>
  );
}

ProfileProjectTile.propTypes = {
  // The project that we are displaying.
  project: PropTypes.object.isRequired,

  // Determines if the user should see the edit icon.
  canEdit: PropTypes.bool.isRequired,
};

export default ProfileProjectTile;
