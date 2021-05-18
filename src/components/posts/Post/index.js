import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { useModal } from "react-modal-hook";
import { useSelector, useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp  } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as regularFaThumbsUp } from "@fortawesome/free-regular-svg-icons";

import Comment from "components/comments/Comment";
import NewCommentContainer from "components/comments/NewCommentContainer";
import PostModal from "components/modals/Post";
import useAuthenticationModal from "hooks/AuthModal";
import PostVisualDisplay from "../PostVisualDisplay";
import PostHeader from "../Header";
import { addLike } from "features/posts/thunks";


const ContentContainer = styled.div`
  padding: ${(props) => props.theme.spacingLg};

  p {
    margin-bottom: 0;
  }
`;

const PostActions = styled.div`
margin-top: 10px;
  border-top: 1px solid ${props => props.theme.success};
  border-bottom: 1px solid ${props => props.theme.success};
  padding: 10px 10px;
`;

const StyledFontAwesomeLikeActivated = styled(FontAwesomeIcon)`
  cursor: pointer;
`

function PostItem({ post, isDisplayedFully }) {
  // Renders a single post in a feed.

  const { createdBy, text, contentObject, contentType, isLikedByCurrentUser} = post;
  const { displayComment, commentCount } = contentObject;
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [newComments, setNewComments] = useState([]);
  const contentTypes = useSelector((state) => state.contentTypes.entities);
  const contentTypeObj = contentTypes.find((ct) => ct.id === contentType);
  const isAuthenticated = useSelector((state) => state.account.token !== "");
  const [showPostModal, hidePostModal] = useModal(({ in: open }) => {
    return <PostModal post={post} onHide={hidePostModal} />;
  });
  const showAuthModal = useAuthenticationModal();
  
  useEffect(() => { if (isDisplayedFully) {showPostModal()} }, []);
  
  function renderNewComments() {
    // When the user creates new comments, we need to render them here.
    return newComments.map((comment) => {
      return <Comment key={comment.id} comment={comment} />;
    });
  }

  function addNewComment(comment) {
    // Adds a new comment to be rendered.
    setNewComments([...newComments, comment]);
  }

  async function handleLikeClick(){
    const action  =  await dispatch(addLike({postId: post.id}));
    if (action.type === "ADD_LIKE/rejected"){
      addToast("Error while liking a post", {
        appearance: "error",
      });
    }
  }

  return (
    <Card className="my-5">
      <PostHeader post={post} />
      <PostVisualDisplay
        contentType={contentTypeObj}
        contentObject={contentObject}
      />
      <ContentContainer>
        <p>
          <b>{createdBy.username}</b> {text}
        </p>
        <PostActions>
          <StyledFontAwesomeLikeActivated 
            icon={isLikedByCurrentUser ? faThumbsUp : regularFaThumbsUp} 
            size="2x" 
            onClick={handleLikeClick}
          />
        </PostActions>
        {commentCount > 1 && (
          <div className="d-block my-2">
            <Button
              variant="link"
              className="px-0"
              onClick={isAuthenticated ? showPostModal : showAuthModal}
            >
              See all {commentCount} comments
            </Button>
          </div>
        )}
        {displayComment && <Comment comment={displayComment} />}
        {renderNewComments()}
      </ContentContainer>
      <NewCommentContainer
        objectId={contentObject.id}
        contentTypeId={contentType}
        addNewComment={addNewComment}
      />
    </Card>
  );
}

PostItem.propTypes = {
  // The post object that we're rendering.
  post: PropTypes.object.isRequired,
  // do we display the post on a model when the page first loaded?
  isDisplayedFully: PropTypes.bool
};

PostItem.defaultProps = {
  isDisplayedFully: false
}

export default PostItem;
