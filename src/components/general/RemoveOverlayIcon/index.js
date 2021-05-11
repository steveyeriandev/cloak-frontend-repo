import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const DeleteSection = styled.div`
  background-color: ${(props) => props.theme.gray200};
  opacity: 0.8;
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1;
  border-radius: 50%;
  padding: 5px 7px;

  &:hover {
    cursor: pointer;
  }
`;

function RemoveOverlayIcon(props) {
  // Provides an icon to overlay over an image and provide an action.
  return (
    <DeleteSection {...props} className="overlay-delete-section">
      <FontAwesomeIcon icon={faTimes} className="mx-1" />
    </DeleteSection>
  );
}

export default RemoveOverlayIcon;
