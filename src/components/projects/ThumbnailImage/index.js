import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import OverlayAuthor from "components/general/OverlayAuthor";
import DefaultProjectPoster from "images/project-generic.jpg";

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 140px;
  background: linear-gradient(
    360deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  transition: height ${(props) => props.theme.transitionFast} ease;

  @media (max-width: ${(props) => props.theme.smBreakpoint}) {
    height: 170px;
  }
`;

const OverlayProjectTitle = styled.div`
  color: white;
  position: absolute;
  width: 90%;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-weight: bold;
  transition: top ${(props) => props.theme.transitionFast} ease;
`;

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${(props) => props.theme.borderRadius};
`;

const ProjectImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

function ProjectThumbnailImage({ project }) {
  /* Returns the image for a project with its proper overlay and styling. */

  function renderProjectTitle() {
    // Sometimes we should hide the project title.
    if (project.hideThumbnailTitle) return null;
    return <OverlayProjectTitle>{project.title}</OverlayProjectTitle>;
  }
  return (
    <Wrapper>
      <ProjectImage
        src={project.image || DefaultProjectPoster}
        alt={project.title}
      />
      <ImageOverlay className="overlay">
        {renderProjectTitle()}
        <OverlayAuthor showName user={project.owner} />
      </ImageOverlay>
    </Wrapper>
  );
}

ProjectThumbnailImage.propTypes = {
  project: PropTypes.object,
};

export default ProjectThumbnailImage;
