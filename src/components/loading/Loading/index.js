import React from "react";
import PropTypes from "prop-types";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";

const StyledSpinner = styled(Spinner)`
  ${({ size }) =>
    size === "sm" &&
    `
    width: 1rem;
    height: 1rem;
  `}

  ${({ size }) =>
    size === "lb" &&
    `
    width: 3rem;
    height: 3rem;
  `}
`;

function LoadingSpinner({ size, ...props }) {
  return (
    <StyledSpinner size={size} animation="border" role="status" {...props}>
      <span className="sr-only">Loading...</span>
    </StyledSpinner>
  );
}

LoadingSpinner.propTypes = {
  // The size of the loading spinner.
  size: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  size: "md",
};

export default LoadingSpinner;
