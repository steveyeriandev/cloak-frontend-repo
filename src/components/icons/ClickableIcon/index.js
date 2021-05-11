import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  &:hover {
    cursor: pointer;
  }
`;

function ClickableFontAwesomeIcon(props) {
  // Provides a reusable font awesome icon that turns to cursor pointer upon hover.
  return (
    <StyledFontAwesomeIcon {...props}>{props.children}</StyledFontAwesomeIcon>
  );
}

export default ClickableFontAwesomeIcon;
