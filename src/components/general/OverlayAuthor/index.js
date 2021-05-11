import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { getUserImage } from "utils/users";

const Wrapper = styled.div`
  color: white;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, ${(props) => (props.dark ? "0.5" : "0.15")});
  border-bottom-left-radius: ${(props) => props.theme.borderRadius};
  border-bottom-right-radius: ${(props) => props.theme.borderRadius};
  transition: height ${(props) => props.theme.transitionFast} ease;

  @media (min-width: ${(props) => props.theme.smBreakpoint}) {
    height: ${(props) => (props.reveal ? "0" : "50px")};
  }
`;

const OverlayImage = styled.img`
  width: 50px;
  border-bottom-left-radius: ${(props) => props.theme.borderRadius};
`;

const OverlayAuthorText = styled.span`
  width: 100%;
  color: rgba(255, 255, 255, 0.8);
  padding-left: 10px;
`;

function OverlayAuthor({ dark, reveal, user, showName }) {
  // Displays an overlay on an image preview for projects or uploads with data about the author.

  // TODO: Can remove the check if the user name is returned in the data, once it's always returned.
  const renderText = showName
    ? user.name
      ? user.name
      : `@${user.username}`
    : `@${user.username}`;

  return (
    <Wrapper className="overlay-author" dark={dark} reveal={reveal}>
      <OverlayImage src={getUserImage(user)} />
      <OverlayAuthorText>{renderText}</OverlayAuthorText>
    </Wrapper>
  );
}

OverlayAuthor.propTypes = {
  // The user that has created the object.
  user: PropTypes.object,

  // Determines if the author overlay should be hidden to start, generally associated with revealing
  // during hover state.
  reveal: PropTypes.bool,

  // Determines if we want the dark variant.
  dark: PropTypes.bool,

  // Determines if we should show thename instead of username.
  showName: PropTypes.bool,
};

OverlayAuthor.defaultProps = {
  dark: false,
  showName: false,
};

export default OverlayAuthor;
