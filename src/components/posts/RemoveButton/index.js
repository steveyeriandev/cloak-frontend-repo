import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { useToasts } from "react-toast-notifications";

import { deletePost } from "features/posts/thunks";

function RemovePostButton({ post, closeModal }) {
  // Provides a button to remove a post from the feed.
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  function removePost() {
    // Perform actions related to removing a post from the feed.
    dispatch(deletePost({ postId: post.id }));
    addToast("Your post has been removed", { appearance: "success" });
    closeModal();
  }

  return (
    <Button variant="danger" onClick={removePost}>
      <FontAwesomeIcon icon={faTrashAlt} /> Yes, remove the post
    </Button>
  );
}

RemovePostButton.propTypes = {
  // The post for which we'll be removing.
  post: PropTypes.object.isRequired,

  // Action to trigger when a post is deleted.
  closeModal: PropTypes.func.isRequired,
};

export default RemovePostButton;
