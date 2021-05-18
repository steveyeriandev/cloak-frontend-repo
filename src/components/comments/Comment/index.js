import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import reactStringReplace from "react-string-replace";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import useAuthenticationModal from "hooks/AuthModal";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { useToasts } from "react-toast-notifications";

import Loading from "components/loading/Loading";
import CommentService from "features/comments/service";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  justify-content: space-between;
  box-shadow: 4px 4px 4px ${props => props.theme.gray300};
  &:focus{
    box-shadow: 4px 4px 4px ${props => props.theme.gray300};
  }
`;

const CommentControl = styled(Form.Control)`
  background-color: white;
  border: none;
`;

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

const ReplyBtn = styled.div`
  font-size: 12px;
  color: ${props => props.theme.success};
  cursor: pointer;
  margin-right: 5px;
  &:hover{
    text-decoration: underline;
  }
`;

const TotalReplies = styled.div`
  font-size: 12px;
  color: ${props => props.theme.success};
  cursor: pointer;
  margin-left: 5px;
  &:hover{
    text-decoration: underline;
  }
`;

const Actions = styled.div`
  display: flex;
  color: ${props => props.theme.success};
`;

function Comment({ comment, ...props }) {
  // Displays an individual comment.
  const [hideReplyInput, setHideRplyInput] = useState(true);
  const [reply, setReply] = useState("");
  const [countReplies, setCountReplies] = useState(comment.repliesCount);
  const isAuthenticated = useSelector((state) => state.account.token !== "");
  const showAuthModal = useAuthenticationModal();
  const [isLoading, setIsLoading] = useState(false);
  const service = new CommentService();
  const { addToast } = useToasts();

  function handleChange(e){
    setReply(e.target.value);
  }

  function handleKeyDown(e){
    // Submit the comment if the user hits enter.
    if (e.key === "Enter") isAuthenticated ? createReply() : showAuthModal();
  }

  async function createReply(){
    setIsLoading(true);
    if (reply){
      try {
        const response = await service.addReply({commentId: comment.id, data: {text: reply}});
        setIsLoading(false);
        setHideRplyInput(true);
        setReply("");
        const newCount = countReplies+1;
        setCountReplies(newCount);
      } catch (err) {
        addToast(
          "Error Occured while trying to create a reply check your internet connection please!",
          { appearance: "error" }
        );
        setIsLoading(false);
      } 
    } else {
      addToast(
        "Provide reply message please!",
        { appearance: "error" }
      );  
    }
  }

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
      <Actions>
      <ReplyBtn onClick={() => setHideRplyInput(!hideReplyInput)}> Reply </ReplyBtn>
      |
      <TotalReplies > Total Replies ({countReplies}) </TotalReplies>
      </Actions>
      {!hideReplyInput ?
        <Wrapper {...props}>
        <CommentControl
          placeholder="Write your reply..."
          className="bg-white"
          value={reply}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        >
        </CommentControl>
        <Button
          variant="link"
          onClick={isAuthenticated ? createReply : showAuthModal}
          style={{ width: 100 }}
        >
          {isLoading ? <Loading size="sm" /> : "Submit"}
        </Button>
      </Wrapper> : ""
      }
    </div>
  );
}

Comment.propTypes = {
  // The comment which we're rendering.
  comment: PropTypes.object.isRequired,
};

export default Comment;
