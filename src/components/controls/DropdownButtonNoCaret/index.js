import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import styled from "styled-components";

const StyledDropdown = styled(DropdownButton)`
  .dropdown-toggle::after {
    display: none;
  }
`;

function DropdownButtonNoCaret(props) {
  // Displays a dropdown button without the caret next to it.
  return <StyledDropdown {...props}>{props.children}</StyledDropdown>;
}

export default DropdownButtonNoCaret;
