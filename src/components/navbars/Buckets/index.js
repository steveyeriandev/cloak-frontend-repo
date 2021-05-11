import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import styled from "styled-components";

import ProjectToggle from "components/projects/Toggle";
import ProjectBucketDropdown from "components/dropdowns/ProjectBuckets";
import BucketActionDropdown from "components/dropdowns/BucketAction";
import ClassManagementButton from "components/buttons/ClassManagement";
import { isProjectAdmin } from "utils/projects.js";
import ProjectActAsContext from "context/ProjectActAs";
import InfoTooltip from "components/tooltips/Info";

const Wrapper = styled.div`
  top: 72px;
  box-shadow: 0px 1px 0px ${(props) => props.theme.gray300};
  z-index: 1029;
  padding-top: 20px;
`;

const BucketRowRightCol = styled(Col)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

function DesktopBucketNavigation({ project }) {
  /* Renders the row that shows the secondary bucket bar navigation on desktop clients. */
  const user = useSelector((state) => state.account.user);
  const currentBucket = useSelector((state) => state.buckets.current);

  return (
    <Wrapper className="bg-white fixed-top d-none d-md-block">
      <Container>
        <Row className="align-items-center">
          <Col sm={6}>
            <Row className="align-items-center">
              <Col sm={4} className="pr-0">
                <ProjectActAsContext.Consumer>
                  {({ registrationTier, isPublic }) => {
                    return (
                      <ProjectBucketDropdown
                        project={project}
                        currentBucket={currentBucket}
                        user={user}
                        actAsRegistrationTier={registrationTier}
                        actAsPublic={isPublic}
                      />
                    );
                  }}
                </ProjectActAsContext.Consumer>
              </Col>
              <Col sm={1} className="pl-0">
                <InfoTooltip text="Choosing different buckets will show you different content of the project" />
              </Col>
              <Col sm={4}>
                {isProjectAdmin(user, project) && (
                  <BucketActionDropdown
                    project={project}
                    bucket={currentBucket}
                  />
                )}
              </Col>
            </Row>
          </Col>
          <BucketRowRightCol sm={6}>
            {isProjectAdmin(user, project) && (
              <ClassManagementButton project={project} className="mr-3" />
            )}
            <ProjectToggle />
          </BucketRowRightCol>
        </Row>
      </Container>
    </Wrapper>
  );
}

DesktopBucketNavigation.propTypes = {
  project: PropTypes.object,
};

export default DesktopBucketNavigation;
