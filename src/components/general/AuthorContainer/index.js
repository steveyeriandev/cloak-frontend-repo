import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import { Link } from "@reach/router";

import { getUserImage } from "utils/users";

const UserImage = styled(Image)`
  width: 50px;
  height: 50px;
  padding: ${(props) => props.theme.spacing};
`;

const UserLink = styled(Link)`
  color: black;

  &:hover {
    text-decoration: none;
  }
`;

function AuthorContainer({ user }) {
  // Provides a container to be used for displaying an author of an object (i.e. post, upload, etc).
  return (
    <div>
      <UserImage src={getUserImage(user)} roundedCircle />
      <UserLink to={`/users/${user.username}`}> {user.username}</UserLink>
    </div>
  );
}

AuthorContainer.propTypes = {
  // The user object for which we're rendering the author container.
  user: PropTypes.object.isRequired,
};

export default AuthorContainer;
