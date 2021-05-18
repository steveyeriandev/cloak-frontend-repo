import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";

import CommentService from "features/comments/service";
import Loading from "components/loading/Loading";
import useAuthenticationModal from "hooks/AuthModal";

import MentionsDropDown from  "components/dropdowns/mentions";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacingLg};
  border-top: 1px solid ${(props) => props.theme.gray300};
`;

const CommentControl = styled(Form.Control)`
  background-color: white;
  border: none;
  width: 100%;
`;

const MentionsWrapper = styled.div`
    box-shadow: 4px 4px 4px #ccc;
    border: 1px solid #ccc;
    border-radius: 5px;
`

function NewCommentContainer({
  addNewComment,
  contentTypeId,
  objectId,
  ...props
}) {
  // Provides a container to make a new comment on a post object.
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [mentionWord, setMentionWord] = useState("");
  const [mentions, setMentions] = useState([]);
  const isAuthenticated = useSelector((state) => state.account.token !== "");
  const showAuthModal = useAuthenticationModal();

  async function createComment() {
    // Create a new comment on the post object and add it to the post's comments.
    setIsLoading(true);
    const service = new CommentService();
    let text = newComment;
    mentions.forEach((mention) => {
      text = text.replace(`@${mention.username}`, `<@${mention.id}>`);
    })
    const payload = {
      objectId,
      contentType: contentTypeId,
      text
    };
    const response = await service.create(payload);
    if (addNewComment) addNewComment(response.data);
    setIsLoading(false);
    setNewComment("");
  }

  function handleChange(e) {
    setNewComment(e.target.value);
    const matches = [...e.target.value.matchAll(/@[^\s]*[^\s]$/g)];
    if (matches.length) {
      const word = matches[matches.length-1][0].slice(1);
      setMentionWord(word);
    } else {
      setMentionWord("");
    }
  }

  function handleKeyDown(e) {
    // Submit the comment if the user hits enter.
    if (e.key === "Enter") isAuthenticated ? createComment() : showAuthModal();
  }

  return (
    <>
    <Wrapper {...props}>
      <CommentControl
        placeholder="Write new comment..."
        className="bg-white"
        value={newComment}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      >
      </CommentControl>
      <Button
        variant="link"
        onClick={isAuthenticated ? createComment : showAuthModal}
        style={{ width: 100 }}
      >
        {isLoading ? <Loading size="sm" /> : "Submit"}
      </Button>
    </Wrapper>
    {mentionWord ? 
      <MentionsWrapper>
        <MentionsDropDown 
        isShown={true} 
        username={mentionWord} 
        setMentionWord={setMentionWord}
        setNewComment={setNewComment}
        newComment={newComment}
        setMentions={setMentions}
        mentions={mentions}
        />
      </MentionsWrapper> : ""
    }
    </>
  );
}

NewCommentContainer.propTypes = {
  // The content type id of the object, defining what type of object the comment is on.
  contentTypeId: PropTypes.number.isRequired,

  // The related object's id.
  objectId: PropTypes.number.isRequired,

  // Sets the new comments in a parent component.
  addNewComment: PropTypes.func,
};

export default NewCommentContainer;
