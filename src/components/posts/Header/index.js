import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "@reach/router";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "react-modal-hook";

import AuthorContainer from "components/general/AuthorContainer";
import PostActionsModal from "components/modals/PostActions";
import { getProjectUrl } from "utils/projects";
import Moment from "react-moment";

const PostActionIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.gray300};
  padding: ${(props) => props.theme.spacing} ${(props) => props.theme.spacingLg};
`;

const PrimaryContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 33%;
`;

const SecondaryContainer = styled.div`
  display: flex;
  align-items: center;
`;

function PostHeader({ post }) {
  // Provides the header component for a post, which can show some metadata about the post and
  // provide actions.
  const { createdBy, created } = post;
  const contentTypes = useSelector((state) => state.contentTypes.entities);
  const user = useSelector((state) => state.account.user);
  const [showPostActionsModal, hidePostActionsModal] = useModal(() => {
    return <PostActionsModal post={post} onHide={hidePostActionsModal} />;
  });

  const contentTypeObject = contentTypes.find(
    (ct) => ct.id === post.contentType
  );
  const isOwner = user.id === createdBy.id;

  function getProject() {
    // Returns the project object for the given post content object.
    if (contentTypeObject.model === "project") return post.contentObject;
    else if (contentTypeObject.model === "bucketupload")
      return post.contentObject.bucket.project;
  }

  return (
    <Wrapper>
      <PrimaryContainer>
        <AuthorContainer user={createdBy} />
        <Moment fromNow className="ml-1 text-muted d-none d-md-block">
          {created}
        </Moment>
      </PrimaryContainer>
      <SecondaryContainer className="pr-3">
        <Link to={getProjectUrl(getProject())}>{getProject().title}</Link>
        {isOwner && (
          <PostActionIcon icon={faEllipsisV} onClick={showPostActionsModal} />
        )}
      </SecondaryContainer>
    </Wrapper>
  );
}

PostHeader.propTypes = {
  // The post object that the header is being rendered for.
  post: PropTypes.object.isRequired,
};

export default PostHeader;
