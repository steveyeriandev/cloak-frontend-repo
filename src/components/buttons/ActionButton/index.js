import React from "react";
import styled from "styled-components";
import DropdownButton from "react-bootstrap/DropdownButton";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import Loading from "components/loading/Loading";

const StyledActionButton = styled(DropdownButton)`
  // Hide the caret.
  > button:after {
    display: none;
  }

  img {
    width: 15px;
  }
`;

function ActionButton({ isLoading, ...props }) {
  // Provides a button to open an action menu.

  function renderTitle() {
    return isLoading ? (
      <Loading size="sm" />
    ) : (
      <FontAwesomeIcon icon={faEllipsisV} color="black" />
    );
  }

  return (
    <StyledActionButton variant="link" title={renderTitle()} {...props}>
      {props.children}
    </StyledActionButton>
  );
}

ActionButton.propTypes = {
  // Determines if the action button should be in a loading state.
  isLoading: PropTypes.bool,
};

ActionButton.defaultProps = {
  isLoading: false,
};

export default ActionButton;
