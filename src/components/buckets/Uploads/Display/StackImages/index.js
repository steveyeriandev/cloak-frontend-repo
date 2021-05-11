import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import UploadDisplayContainer from "../Base";

const StackImageElement = styled.img`
  display: block;
  width: 100%;
  height: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  &:hover {
    cursor: pointer;
  }
`;

function StackImage({ stack, ...props }) {
  /* Returns the image for a stack with its proper overlay and styling. */

  // Sometimes the cover image might not be ready yet.
  if (stack.coverImage === null) return null;

  return (
    <UploadDisplayContainer createdBy={stack.createdBy}>
      <StackImageElement
        src={stack.coverImage.imageThumbnail}
        alt=""
        {...props}
      />
    </UploadDisplayContainer>
  );
}

StackImage.propTypes = {
  stack: PropTypes.object.isRequired,
};

export default StackImage;
