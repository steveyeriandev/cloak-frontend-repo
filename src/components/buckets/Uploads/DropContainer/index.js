import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const DropWrapper = styled.div`
  background: linear-gradient(
    256.52deg,
    #e2f8ff 0%,
    #ffe3ba 51.56%,
    #ffced0 100%
  );
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
function DropContainer() {
  // Visual container to show when the user is dropping a file, or when an image container is empty.
  return (
    <DropWrapper>
      <FontAwesomeIcon icon={faImage} size="8x" />
      <h3 className="mt-4 mb-2">Drop it like it's hot</h3>
      <p>Drag and drop to upload images</p>
    </DropWrapper>
  );
}

export default DropContainer;
