import React, { useEffect } from "react";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import BaseModal from "components/modals/Base";
import LoadingContainer from "components/loading/Container";
import PostVisualDisplay from "components/posts/PostVisualDisplay";
import CommentContainer from "components/comments/Container";
import { getUserImage } from "utils/users";
import { bucketUploadType } from "utils/enums";
import PostActions from "components/posts/actions";

const Wrapper = styled.div``;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing};
  border-bottom: 1px solid ${(props) => props.theme.gray300};
`;

const CloseIcon = styled(FontAwesomeIcon)`
  &:hover {
    cursor: pointer;
  }
`;

function PostModal({ post, ...props }) {
  // Provides a modal for viewing the details of a post.

  const contentTypes = useSelector((state) => state.contentTypes.entities);

  useEffect(() => {
    async function fetchComments() {}
    fetchComments();
  });

  const { createdBy, contentObject } = post;
  const contentTypeObj = contentTypes.find((ct) => ct.id === post.contentType);
  const isLoading = false;

  // Webcomic modals should be smaller than the other post modal types.
  const size =
    contentObject.kind && contentObject.kind === bucketUploadType.comic
      ? "md"
      : "lg";

  function renderModalContent() {
    return isLoading ? (
      <LoadingContainer />
    ) : (
      <Wrapper>
        <PostHeader>
          <div>
            <Image
              src={getUserImage(createdBy)}
              alt=""
              roundedCircle
              style={{ height: 40 }}
            />
            <span className="pl-2">{createdBy.username}</span>
          </div>
          <CloseIcon icon={faTimes} className="mr-3" onClick={props.onHide} />
        </PostHeader>
        <div className="d-flex align-items-center justify-content-center">
          <PostVisualDisplay
            contentObject={contentObject}
            contentType={contentTypeObj}
            showGenericProject
          />
        </div>
        <PostActions post={post} />
        <CommentContainer
          contentObject={contentObject}
          contentTypeObj={contentTypeObj}
        />
      </Wrapper>
    );
  }

  return (
    <BaseModal {...props} size={size}>
      {renderModalContent()}
    </BaseModal>
  );
}

PostModal.propTypes = {
  // The post object that will be rendered in the modal.
  post: PropTypes.object.isRequired
};

export default PostModal;
