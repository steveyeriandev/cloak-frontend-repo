import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import reactStringReplace from "react-string-replace";
import styled from "styled-components";

const AuthorLink = styled(Link)`
  font-weight: bold;
  color: black;

  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.success};
  }
`;

const MentionLink = styled(Link)`
  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.success};
  }
`;

function Comment({ comment, ...props }) {
  // Displays an individual comment.

  function renderText() {
    // Replace any mentions with a link to the user's profile, and proper representation.
    let renderedText = comment.text;
    comment.mentions.forEach((mention) => {
      renderedText = reactStringReplace(
        renderedText,
        `<@${mention.id}>`,
        (match, i) => (
          <MentionLink to={`/users/${mention.username}`}>
            @{mention.username}
          </MentionLink>
        )
      );
    });

    return renderedText;
  }

  const { username } = comment.author;
  return (
    <div className="d-block" {...props}>
      <AuthorLink to={`/users/${username}`}>{username}</AuthorLink>{" "}
      {renderText()}
    </div>
  );
}

Comment.propTypes = {
  // The comment which we're rendering.
  comment: PropTypes.object.isRequired,
};

export default Comment;
