import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";
import Button from "react-bootstrap/Button";

import Loading from "components/loading/Loading";
import { registrationTiersUrl } from "features/tiers/api";
import { axiosInstance } from "features/api";
import { getProjectUrl } from "utils/projects";
import { enrollmentStatus } from "utils/enums";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
`;

const AvailabilityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: ${(props) => props.theme.borderRadius};
`;

function ProjectVerifyPaymentRoute({ registrationTierId }) {
  // After a user pays for a class, we need to verify that the there is still room in the class.
  const [errorMessage, setErrorMessage] = useState(null);
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    async function verifyAvailability() {
      // Check that class is still available and then route the user accordingly.
      const url = `${registrationTiersUrl}${registrationTierId}/check_enrollment/`;
      try {
        const response = await axiosInstance.get(url);
        const { project, status } = response.data;
        const statusValue = parseInt(status);
        if (statusValue === enrollmentStatus.active) {
          navigate(
            `${getProjectUrl(
              project
            )}?success=true&registrationTier=${registrationTierId}`
          );
        } else if (statusValue === enrollmentStatus.canceled) {
          setErrorMessage(
            "Unfortunately the class is full, payment has been canceled."
          );
          setProjectData(project);
        } else {
          setErrorMessage("Could not verify availability status.");
          setProjectData(project);
        }
        clearInterval(interval);
      } catch (err) {
        if (err && err.response) {
          // If there is a 404, we need to wait for the next ping because the enrollment may have
          // not arrived yet from stripe webhook.
          const { status } = err.response;
          if (status === 500) {
            clearInterval(interval);
            setErrorMessage("Oops, there was an error verifying availability.");
          }
        } else {
          clearInterval(interval);
          setErrorMessage("Oops, there was an error verifying availability.");
        }
      }
    }

    verifyAvailability();
    let interval = setInterval(verifyAvailability, 4000);
  }, [registrationTierId]);

  function renderContent() {
    if (!errorMessage) {
      return (
        <>
          <h4 className="mb-4">Verifying availability</h4>
          <Loading />
        </>
      );
    } else {
      const url = projectData ? getProjectUrl(projectData) : "/";
      const text = projectData ? "Back to class page" : "Ok";

      return (
        <>
          <p>{errorMessage}</p>
          <Button onClick={() => navigate(url)}>{text}</Button>
        </>
      );
    }
  }

  return (
    <Wrapper>
      <AvailabilityContainer className="mt-5 border">
        {renderContent()}
      </AvailabilityContainer>
    </Wrapper>
  );
}

export default ProjectVerifyPaymentRoute;
