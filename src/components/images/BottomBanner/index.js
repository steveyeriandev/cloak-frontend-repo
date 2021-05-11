import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  position: absolute;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  bottom: 0;
  width: 225px;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
`;

function ImageBottomBanner({ user: { username } }) {
  /* A row of data that is overlayed on an image. */
  return (
    <Wrapper>
      <InnerWrapper>{username}</InnerWrapper>
    </Wrapper>
  );
}

ImageBottomBanner.propTypes = {
  user: PropTypes.object,
};

export default ImageBottomBanner;
