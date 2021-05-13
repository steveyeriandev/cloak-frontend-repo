import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "@reach/router";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledLink = styled(Nav.Link)`
  @media (max-width: ${(props) => props.theme.smBreakpoint}) {
    width: auto;
  }

  &:hover {
    color: #333;
  }

  svg {
    font-size: 1.2rem;
  }

  margin: 0 0.8rem;
  color: black;
  border-radius: ${(props) => props.theme.borderRadius};
`;

function MainLinkIcon({ icon, ...props }) {
  return (
    <StyledLink as={Link} {...props}>
      <FontAwesomeIcon icon={icon} />
    </StyledLink>
  );
}

MainLinkIcon.propTypes = {
  // The icon that should be rendered for the navigation.
  icon: PropTypes.object.isRequired,
};

export default MainLinkIcon;
