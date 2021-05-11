import React from "react";
import { navigate } from "@reach/router";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled(Button)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function BucketNavigationButton({ children, to, active, ...props }) {
  // Button component for navigating to buckets.

  return (
    <StyledButton
      variant={active ? "primary" : "light"}
      size="sm"
      className={`${props.className} my-2`}
      onClick={() => navigate(to)}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

BucketNavigationButton.propTypes = {
  /* Url that the button will navigate to. */
  to: PropTypes.string,

  /* Determines the styling of an active location button. */
  active: PropTypes.bool,
};

export default BucketNavigationButton;
