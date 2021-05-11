import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;

  @media (min-width: ${(props) => props.theme.smBreakpoint}) {
    padding-top: 48px;
  }
`;

function ProjectDetailContent(props) {
  // Provides a container to display the project detail content.
  return <Wrapper {...props}>{props.children}</Wrapper>;
}

export default ProjectDetailContent;
