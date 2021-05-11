import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { useLocation } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import {
  getProjectBaseUrl,
  getProjectUrl,
  getProjectDescriptor,
} from "utils/projects.js";
import BucketNavigationButton from "components/buttons/BucketLink";

const Wrapper = styled.div`
  top: 73px;
  box-shadow: 0px 1px 0px ${(props) => props.theme.gray300};
  z-index: 1029;
  padding-top: 20px;
`;

function ClassManagementNavigation({ project }) {
  /* Renders the row that shows the buckets for a project. */
  const location = useLocation();

  const projectManageBaseUrl = getProjectBaseUrl(project) + "/manage";
  const projectInfoUrl = getProjectUrl(project);

  // Provides data for the different navigation links.
  const navigationData = [
    { to: `${projectManageBaseUrl}/tiers`, label: "Tiers" },
    { to: `${projectManageBaseUrl}/students`, label: "Students" },
    { to: `${projectManageBaseUrl}/payments`, label: "Payments" },
  ];

  function renderNavigationButtons() {
    return navigationData.map((obj, index) => {
      const isActive = location.pathname === obj.to;
      return (
        <BucketNavigationButton
          className="m-2"
          to={obj.to}
          active={isActive}
          key={index}
        >
          {obj.label}
        </BucketNavigationButton>
      );
    });
  }

  return (
    <Wrapper className="bg-white fixed-top">
      <Container>
        <Row noGutters className="align-items-center">
          <Col>
            <BucketNavigationButton
              to={projectInfoUrl}
              className="ml-0 my-2 mr-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </BucketNavigationButton>
            {getProjectDescriptor(project)} Management
          </Col>
          <Col className="text-right">{renderNavigationButtons()}</Col>
        </Row>
      </Container>
    </Wrapper>
  );
}

ClassManagementNavigation.propTypes = {
  project: PropTypes.object,
};

export default ClassManagementNavigation;
