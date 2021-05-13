import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import NewCommentContainer from "components/comments/NewCommentContainer";
import Comments from "components/comments/Comments";

const Wrapper = styled.div``;

const CommentsContainer = styled.div`
  overflow-y: scroll;
  max-height: 300px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

function CommentContainer({ contentObject, contentTypeObj }) {
  // Provides a full container that allows displaying and creating comments for a given object.

  // Additional comments that are passed into the comments component.
  const [comments, setComments] = useState([]);

  return (
    <Wrapper className="border-top">
      <CommentsContainer id="comments-container" className="my-2 px-4">
        <Comments
          contentObject={contentObject}
          contentTypeObj={contentTypeObj}
          additionalComments={comments}
        />
      </CommentsContainer>
      <NewCommentContainer
        objectId={contentObject.id}
        contentTypeId={contentTypeObj.id}
        addNewComment={(comment) => setComments([...comments, comment])}
        className="mt-auto"
        isFixed
      />
    </Wrapper>
  );
}

CommentContainer.propTypes = {
  // The object that the comments belong to.
  contentObject: PropTypes.object.isRequired,

  // The content type object for the content object.
  contentTypeObj: PropTypes.object.isRequired,
};

export default CommentContainer;
