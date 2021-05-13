import React from "react";
import Image from "react-bootstrap/Image";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 80vh;
  overflow-y: scroll;
  overflow-x: hidden;

  @media (max-width: ${(props) => props.theme.smBreakpoint}) {
    height: 60vh;
  }
`;

function Webcomic({ bucketUpload }) {
  // Renders a webcomic in a scrollable container.
  function renderImages() {
    return bucketUpload.images.map((image) => (
      <Image fluid src={image.image} alt="" key={image.id} />
    ));
  }

  return <Wrapper>{renderImages()}</Wrapper>;
}

export default Webcomic;
