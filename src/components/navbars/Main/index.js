import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { navigate } from "@reach/router";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  faHouseUser,
  faGraduationCap,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

import ProjectSearchControl from "components/controls/ProjectSearch";
import AccountDropdown from "components/dropdowns/Account";
import NotificationsDropDown from "components/dropdowns/notifications";
import MobileBucketNavigation from "components/navbars/MobileBucketNavigation";
import MainLinkIcon from "../MainLinkIcon";

const RightNavbar = styled(Navbar)`
  box-shadow: 0px 1px 0px ${(props) => props.theme.gray300};
`;

const RightNav = styled(Nav)`
  // Inner nav that's on the right side of the navbar.

  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-basis: 50%;
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

const SearchContainer = styled.div`
  @media (max-width: ${(props) => props.theme.smBreakpoint}) {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.smBreakpoint}) {
    justify-content: center;
    flex-basis: 50%;
    margin-left: 20%;
  }
`;

function MainNavbar({ shadow }) {
  // This is the navbar that is across the top of the main application.
  const accountState = useSelector((state) => state.account);
  const [expanded, setExpanded] = useState(false);

  const { user } = accountState;
  const isAuthenticated = accountState.token !== "";

  return (
    <RightNavbar
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
          <SearchContainer>
            <ProjectSearchControl
              className="mr-2"
              placeholder="Search projects..."
            />
          </SearchContainer>
          <RightNav className="ml-auto">
            <MobileBucketNavigation collapse={() => setExpanded(false)} />
            <MainLinkIcon
              icon={faHouseUser}
              to="/feed"
              onClick={() => setExpanded(false)}
            />
            {isAuthenticated && (
              <MainLinkIcon
                to="/projects/create"
                onClick={() => setExpanded(false)}
                icon={faPlusCircle}
              />
            )}
            <MainLinkIcon
              icon={faGraduationCap}
              to="/projects"
              onClick={() => setExpanded(false)}
            />
            {isAuthenticated && <NotificationsDropDown />}
            {user.enrollments &&
              (user.enrollments.length > 0 || user.projects.length > 0) && (
                <Button
                  variant="light"
                  onClick={() =>
                    navigate(`/users/${accountState.user.username}`)
                  }
                >
                  My classes
                </Button>
              )}
            <AccountDropdown account={accountState} setExpanded={setExpanded} />
          </RightNav>
        </StyledCollapse>
      </Container>
    </RightNavbar>
  );
}

MainNavbar.propTypes = {
  /* Determine if the navbar should have shadow underneath.

     For some reason, bool was giving an error and needed to switch to 1/0 instead.
  */
  shadow: PropTypes.number,
};

export default MainNavbar;
