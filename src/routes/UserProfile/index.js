import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useModal } from "react-modal-hook";

import LoadingContainer from "components/loading/Container";
import ImageUploader from "components/images/ImageUploader";
import StatItem from "components/general/StatItem";
import SocialContainer from "components/social/Container";
import SectionHeader from "components/general/SectionHeader";
import ProfileProjectSection from "components/profile/ProjectSection";
import ProfileForm from "components/forms/Profile";
import FormModal from "components/modals/Form";
import UserService from "features/users/service";
import { updateProfileImage } from "features/accounts/thunks";
import { getUserImage, userHasSocial } from "utils/users";

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const InnerContainer = styled.div`
  margin: 0 12%;

  @media (max-width: ${(props) => props.theme.smBreakpoint}) {
    margin-top: 48px;
  }
`;

function UserProfile({ username }) {
  // Displays a user's profile and allows them to edit it, if they are the user.
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const user = useSelector((state) => state.account.user);

  const [showProfileModal, hideProfileModal] = useModal(() => {
    return (
      <FormModal title="Update profile" onHide={hideProfileModal}>
        <ProfileForm user={user} closeModal={hideProfileModal} />
      </FormModal>
    );
  }, [user]);

  useEffect(() => {
    /* Fetch the user data for this profile.

       Instead of just dispatching fetchUser, we have to do all of this in case the user changes
       their username, which changes the url.
    */
    async function fetchUser() {
      const userService = new UserService();
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const response = await userService.fetch(username);
        setUserData(response.data);
        setIsLoading(false);
      } catch (err) {
        setErrorMessage(`Error finding user with username "${username}"`);
        setIsLoading(false);
      }
    }

    if (!userData || userData.username !== username) fetchUser();
  }, [username, user, userData]);

  if (errorMessage)
    return (
      <Alert className="m-5" variant="danger">
        {errorMessage}
      </Alert>
    );

  if (isLoading || userData === null)
    return <LoadingContainer text="Loading user data" />;

  const {
    firstName,
    lastName,
    teachesProjects,
    registeredProjects,
    bio,
    studentCount,
  } = userData;

  // Determines if the user is viewing themself, and should have edit permissions.
  const isSelfUser = user && user.username === username;

  function renderSocialHeader() {
    // We should only render the header if the user has some social linked.
    if (userHasSocial(userData))
      return <SectionHeader className="d-block">Social</SectionHeader>;
  }

  function renderImageContainer() {
    // Renders the image differently depending on if viewing own profile.
    return isSelfUser ? (
      <>
        <ImageUploader
          action={updateProfileImage}
          imageSrc={getUserImage(user)}
        />
        <Button
          block
          variant="secondary"
          className="mt-2 font-weight-bold"
          onClick={showProfileModal}
        >
          Edit Profile
        </Button>
      </>
    ) : (
      <Image src={getUserImage(userData)} rounded fluid />
    );
  }

  return (
    <Container className="mt-4 p-3">
      <InnerContainer>
        <Row>
          <Col sm={2}>{renderImageContainer()}</Col>
          <Col sm={10}>
            <h4 className="border-bottom py-3 font-weight-bold">
              {firstName} {lastName}
            </h4>
            {teachesProjects.length > 0 && (
              <StatsContainer className="border-bottom py-3">
                <StatItem
                  top={teachesProjects.length + registeredProjects.length}
                  bottom="classes"
                />
                <StatItem top={studentCount} bottom="students" />
                <StatItem top="0" bottom="followers" />
              </StatsContainer>
            )}
            <p className="py-3">{bio ? bio : null}</p>
            {renderSocialHeader()}
            <SocialContainer user={userData} />
          </Col>
        </Row>
        <hr />
        <ProfileProjectSection header="Teaches" projects={teachesProjects} />
        <ProfileProjectSection
          header="Member of"
          projects={userData.registeredProjects}
        />
      </InnerContainer>
    </Container>
  );
}

export default UserProfile;
