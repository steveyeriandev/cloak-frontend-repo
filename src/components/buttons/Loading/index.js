import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

import Loading from "components/loading/Loading";

const StyledButton = styled(Button)`
  width: ${(props) => {
    if (props.block === true) {
      return "100%";
    }
    return props.width ? `${props.width}px` : "80px";
  }};
`;

function LoadingButton({ isLoading, children, ...props }) {
  const renderContent = () => {
    if (isLoading) return <Loading size="sm" />;
    else return children;
  };
  return (
    <StyledButton {...props} disabled={isLoading || props.disabled}>
      {renderContent()}
    </StyledButton>
  );
}

LoadingButton.propTypes = {
  isLoading: PropTypes.bool,
  width: PropTypes.number,
};

export default LoadingButton;
