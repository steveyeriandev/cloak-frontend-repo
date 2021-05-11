import React from "react";
import Navbar from "react-bootstrap/Navbar";
import styled from "styled-components";

const StyledNavbar = styled(Navbar)`
  z-index: 1;

  @media (min-width: ${(props) => props.theme.smBreakpoint}) {
    margin-bottom: 70px;
  }
`;

function FixedBottomNavbar(props) {
  // Creates a navbar that is fixed to the bottom of a parent element.
  return (
    <StyledNavbar fixed="bottom" {...props}>
      {props.children}
    </StyledNavbar>
  );
}

export default FixedBottomNavbar;
