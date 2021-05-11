import React from "react";
import Image from "react-bootstrap/Image";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledImage = styled(Image)`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 4px 8px 0 rgba(0, 0, 0, 0.1);
`;

function ShadowImage(props) {
  // Apply a shadow styling to an `Image` component.
  return <StyledImage {...props} />;
}

ShadowImage.propTypes = {
  /* Optionally pass in an absolute height for the image. */
  height: PropTypes.number,
};

export default ShadowImage;
