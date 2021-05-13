import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "@reach/router";
import { useSelector } from "react-redux";

import AuthorContainer from "components/general/AuthorContainer";
import { getProjectUrl } from "utils/projects";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.gray300};
  padding: ${(props) => props.theme.spacing} ${(props) => props.theme.spacingLg};
`;

const SecondaryContainer = styled.div``;

function PostHeader({ post }) {
  // Provides the header component for a post, which can show some metadata about the post and
  // provide actions.
  const { createdBy } = post;
  const contentTypes = useSelector((state) => state.contentTypes.entities);
  const contentTypeObject = contentTypes.find(
    (ct) => ct.id === post.contentType
  );

  function getProject() {
    // Returns the project object for the given post content object.
    if (contentTypeObject.model === "project") return post.contentObject;
    else if (contentTypeObject.model === "bucketupload")
      return post.contentObject.bucket.project;
  }

  return (
    <Wrapper>
      <AuthorContainer user={createdBy} />
      <SecondaryContainer className="pr-3">
        <Link to={getProjectUrl(getProject())}>{getProject().title}</Link>
      </SecondaryContainer>
    </Wrapper>
  );
}

PostHeader.propTypes = {
  // The post object that the header is being rendered for.
  post: PropTypes.object.isRequired,
};

export default PostHeader;
