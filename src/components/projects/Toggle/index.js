import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { navigate } from "@reach/router";
import { getProjectUrl } from "utils/projects.js";

const StyledDropdown = styled(Dropdown.Toggle)`
  color: #333;
  width: 100%;
  max-width: 300px;

  &::after {
    margin-bottom: 4px;
  }
`;

const StyledProjectTitle = styled.span`
  padding-top: 4px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  display: inline-block;
  text-align: right;

  @media (max-width: ${(props) => props.theme.smBreakpoint}) {
    text-align: center;
  }
`;

function ProjectToggle() {
  /* Allows the user to easily switch between their various projects of interest. */
  const accountState = useSelector((state) => state.account);
  const registrations = useSelector((state) => {
    if (state.account.user !== {}) return state.account.user.registrations;
    return [];
  });
  const projectState = useSelector((state) => state.projects.detail);

  function renderItems() {
    // Show the registrations the user has, if it's not the currently selected project.
    if (registrations === undefined) return null;

    // Build a distinct list of the projects that the user has registrations for.
    let projectRegistrations = [];
    registrations.forEach((registration) => {
      if (
        registration.project.id !== projectState.id &&
        !projectRegistrations
          .map((project) => project.id)
          .includes(registration.project.id)
      ) {
        projectRegistrations.push(registration.project);
      }
    });

    const results = projectRegistrations.map((project) => {
      return (
        <Dropdown.Item
          key={project.id}
          onClick={() => navigate(getProjectUrl(project))}
        >
          <StyledProjectTitle>{project.title}</StyledProjectTitle>
        </Dropdown.Item>
      );
    });

    if (results.length === 0)
      return <Dropdown.Item disabled>No class registrations</Dropdown.Item>;

    return results;
  }

  function renderProjectToggle() {
    if (accountState.token === "") {
      return <StyledProjectTitle>{projectState.title}</StyledProjectTitle>;
    }

    return (
      <StyledDropdown variant="link" id="dropdown-basic">
        <StyledProjectTitle>{projectState.title}</StyledProjectTitle>
      </StyledDropdown>
    );
  }

  return (
    <Dropdown>
      {renderProjectToggle()}

      <Dropdown.Menu>{renderItems()}</Dropdown.Menu>
    </Dropdown>
  );
}

export default ProjectToggle;
