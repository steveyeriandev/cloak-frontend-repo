import React, { useState } from "react";
import MainNavbar from "components/navbars/Main";
import styled from "styled-components";

import SiteFooter from "components/general/SiteFooter";
import ProjectActAsContext from "context/ProjectActAs";

const DashboardRouteContainer = styled.div`
  height: 100%;
`;

const InnerWrapper = styled.div`
  padding-top: 70px;
  min-height: 100vh;
`;

export default function DashboardRoute({ children }) {
  // Route to handle shared layout for our dashboard pages.

  const [actAsPublic, setActAsPublic] = useState(false);
  const [actAsRegistrationTier, setActAsRegistrationTier] = useState(null);

  return (
    <DashboardRouteContainer>
      <ProjectActAsContext.Provider
        value={{
          isPublic: actAsPublic,
          registrationTier: actAsRegistrationTier,
          setPublic: (value) => setActAsPublic(value),
          setRegistrationTier: (value) => setActAsRegistrationTier(value),
        }}
      >
        <MainNavbar />
        <InnerWrapper className="dashboard-route-inner">
          {{ ...children }}
        </InnerWrapper>
        <SiteFooter />
      </ProjectActAsContext.Provider>
    </DashboardRouteContainer>
  );
}
