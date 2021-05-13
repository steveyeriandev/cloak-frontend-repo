import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link, navigate } from "@reach/router";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

import ProjectSearchControl from "components/controls/ProjectSearch";
import AccountDropdown from "components/dropdowns/Account";
import NotificationDropdown from "components/dropdowns/Notification";
import MobileBucketNavigation from "components/navbars/MobileBucketNavigation";
import HomeIcon from "images/icons/home.png";

const StyledNavbar = styled(Navbar)`
  box-shadow: 0px 1px 0px ${(props) => props.theme.gray300};
`;

const StyledNav = styled(Nav)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;

  > * {
    margin: 0 5px;
  }

  > a {
    padding: 0;
  }
`;

const StyledCollapse = styled(Navbar.Collapse)`
  @media (max-width: ${(props) => props.theme.smBreakpoint}) {
    margin-top: ${(props) => props.theme.spacing};
  }
`;

const StyledHomeIcon = styled.img`
  @media (max-width: ${(props) => props.theme.smBreakpoint}) {
    width: auto;
  }

  padding: 10px;
  background-color: ${(props) => props.theme.gray300};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const StyledBrand = styled(Navbar.Brand)`
  &:hover {
    cursor: pointer;
  }
`;

const MainNavLink = styled(Nav.Link)`
  background-color: ${(props) => props.theme.gray300};
  border-radius: ${(props) => props.theme.borderRadius};
  color: black;
  padding: 5px 10px !important;
  font-size: 1.3rem;

  &:hover {
    color: black;
  }
`;

const NavButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
`;

const SearchContainer = styled.div`
  @media (max-width: ${(props) => props.theme.smBreakpoint}) {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.smBreakpoint}) {
    width: 40%;
    margin-left: 15%;
  }
`;

function MainNavbar({ shadow }) {
  // This is the navbar that is across the top of the main application.
  const accountState = useSelector((state) => state.account);
  const [expanded, setExpanded] = useState(false);

  const { user } = accountState;

  return (
    <StyledNavbar
      bg="white"
      fixed="top"
      expand="lg"
      shadow={shadow}
      expanded={expanded}
    >
      <Container>
        <StyledBrand className="font-weight-bold" onClick={() => navigate("/")}>
          Rad How To School
        </StyledBrand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <StyledCollapse id="basic-navbar-nav">
          <StyledNav>
            <MobileBucketNavigation collapse={() => setExpanded(false)} />
            <SearchContainer>
              <ProjectSearchControl
                className="mr-2"
                placeholder="Search projects..."
              />
            </SearchContainer>
            <NavButtonContainer>
              {user.enrollments &&
                (user.enrollments.length > 0 || user.projects.length > 0) && (
                  <Nav.Link
                    as={Button}
                    onClick={() =>
                      navigate(`/users/${accountState.user.username}`)
                    }
                    variant="secondary text-dark"
                    className="d-none d-md-block"
                    style={{ width: 120 }}
                  >
                    <FontAwesomeIcon icon={faGraduationCap} /> My classes
                  </Nav.Link>
                )}

              <NotificationDropdown
                account={accountState}
                setExpanded={setExpanded}
              >
              </NotificationDropdown>

              <Nav.Link as={Link} to="/">
                <StyledHomeIcon src={HomeIcon} alt="Rad how to school home" />
              </Nav.Link>
              {user.isApproved && (
                <MainNavLink
                  as={Link}
                  to="/projects/create"
                  className="ml-2"
                  onClick={() => setExpanded(false)}
                >
                  <FontAwesomeIcon icon={faPlusCircle} />
                </MainNavLink>
              )}
              <AccountDropdown
                account={accountState}
                setExpanded={setExpanded}
              />
            </NavButtonContainer>
          </StyledNav>
        </StyledCollapse>
      </Container>
    </StyledNavbar>
  );
}

MainNavbar.propTypes = {
  /* Determine if the navbar should have shadow underneath.

     For some reason, bool was giving an error and needed to switch to 1/0 instead.
  */
  shadow: PropTypes.number,
};

export default MainNavbar;
