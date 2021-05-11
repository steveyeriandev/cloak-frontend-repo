import React from "react";
import PropTypes from "prop-types";
import Image from "react-bootstrap/Image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { getUserImage } from "utils/users";

const Wrapper = styled.div`
  display: inline-block;
  background-color: ${(props) => props.theme.dark};
  color: white;
  height: 100%;
  border-radius: ${(props) => props.theme.borderRadius};
  margin-right: ${(props) => props.theme.spacing};

  > span {
    height: 100%;
    padding: ${(props) => props.theme.spacing}
      ${(props) => props.theme.spacingLg};
  }
`;

const ClickableFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const UserImage = styled(Image)`
  width: 35px;
`;

function UserBlock({ user, action, ...props }) {
  // Displays a block component for displaying the user's name and image.

  function renderAction() {
    /* If there is an action passed in, then it should be rendered here. For now the only action
       supported is to remove the teacher from a project, but this might be expanded in the future.
    */
    return action === null ? null : (
      <ClickableFontAwesomeIcon icon={faTimes} onClick={action} />
    );
  }

  return (
    <Wrapper {...props}>
      <UserImage rounded src={getUserImage(user)} alt="" />
      <span>@{user.username}</span>
      {renderAction()}
    </Wrapper>
  );
}

UserBlock.propTypes = {
  // The user object that we're rendering.
  user: PropTypes.object.isRequired,

  // Action to action the user from the project.
  action: PropTypes.func,
};

UserBlock.defaultProps = {
  action: null,
};

export default UserBlock;
