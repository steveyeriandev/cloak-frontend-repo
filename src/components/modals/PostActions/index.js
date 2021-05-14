import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faTimes,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import BaseModal from "components/modals/Base";
import ModalHeader from "components/modals/Header";
import PostForm from "components/forms/Post";
import ButtonContainer from "components/forms/shared/ButtonContainer";
import RemovePostButton from "components/posts/RemoveButton";

const PostActionsListGroup = styled(ListGroup)`
  > .list-group-item {
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.gray300};

    &:hover {
      cursor: pointer;
      background-color: ${(props) => props.theme.gray100};
    }
  }
`;

function PostActions({ post, ...props }) {
  // Provides the user with actions to take on a post.

  const [modalSection, setModalSection] = useState("actions");

  function renderActionsSection() {
    // The main section that allows the user to choose which action to perform.
    return (
      <PostActionsListGroup>
        <ListGroup.Item onClick={() => setModalSection("editPost")}>
          <FontAwesomeIcon icon={faPencilAlt} /> Edit Post
        </ListGroup.Item>
        <ListGroup.Item onClick={() => setModalSection("removePost")}>
          <FontAwesomeIcon icon={faTrashAlt} /> Remove Post
        </ListGroup.Item>
        <ListGroup.Item onClick={props.onHide}>
          <FontAwesomeIcon icon={faTimes} /> Cancel
        </ListGroup.Item>
      </PostActionsListGroup>
    );
  }

  function renderEditPostSection() {
    return (
      <PostForm
        post={post}
        closeModal={props.onHide}
        backAction={() => setModalSection("actions")}
        className="mx-5 my-3"
      />
    );
  }

  function renderDeletePostSection() {
    return (
      <div className="mx-5 my-3">
        <p>
          Deleting the post will remove it from the feed, but will not delete
          the underlying post object.
        </p>
        <p className="p-2">Are you sure you want to remove this post?</p>
        <ButtonContainer className="justify-content-between">
          <Button
            variant="secondary"
            onClick={() => setModalSection("actions")}
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Back
          </Button>
          <RemovePostButton post={post} closeModal={props.onHide} />
        </ButtonContainer>
      </div>
    );
  }

  function getModalTitle() {
    switch (modalSection) {
      case "editPost":
        return "Update post";
      case "removePost":
        return "Remove post";
      default:
        return null;
    }
  }

  function renderSection() {
    // Chooses which section to render based on the component state.
    switch (modalSection) {
      case "actions":
        return renderActionsSection();
      case "editPost":
        return renderEditPostSection();
      case "removePost":
        return renderDeletePostSection();
      default:
        return renderActionsSection();
    }
  }

  return (
    <BaseModal {...props}>
      <ModalHeader title={getModalTitle()} />
      <Modal.Body className="p-0">{renderSection()}</Modal.Body>
    </BaseModal>
  );
}

PostActions.propTypes = {
  // The post object that is to be rendered.
  post: PropTypes.object.isRequired,
};

export default PostActions;
