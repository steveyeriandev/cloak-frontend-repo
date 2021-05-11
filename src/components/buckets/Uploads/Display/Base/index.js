import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import OverlayAuthor from "components/general/OverlayAuthor";

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;

  &:hover {
    .overlay-author {
      height: 50px;
    }
  }
`;

function UploadDisplayContainer({ createdBy, ...props }) {
  // Provides a generic upload container that should be used for all types of bucket upload objects.
  return (
    <Wrapper {...props}>
      {props.children}
      <OverlayAuthor dark reveal user={createdBy} />
    </Wrapper>
  );
}

UploadDisplayContainer.propTypes = {
  // The user object that is associated with creating the upload.
  createdBy: PropTypes.object.isRequired,
};

export default UploadDisplayContainer;
