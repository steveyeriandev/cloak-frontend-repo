import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import LoadingSpinner from "components/loading/Loading";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

function LoadingContainer({ text, ...props }) {
  return (
    <Wrapper {...props}>
      {text && <p>{text}</p>}
      <LoadingSpinner size="lg" />
    </Wrapper>
  );
}

LoadingContainer.propTypes = {
  // Optional text to show with the loading spinner.
  text: PropTypes.string,
};

export default LoadingContainer;
