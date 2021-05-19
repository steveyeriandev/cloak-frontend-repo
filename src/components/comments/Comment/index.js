import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import reactStringReplace from "react-string-replace";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import useAuthenticationModal from "hooks/AuthModal";
import Button from "react-bootstrap/Button";
import { useToasts } from "react-toast-notifications";

import Loading from "components/loading/Loading";
import CommentService from "features/comments/service";
import RepliesList from "components/replies/repliesList";

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
  const { addToast } = useToasts();
  const displayRepliesForComment = useSelector((state) => state.notifications.displayRepliesForComment);
  const [hideReplyInput, setHideRplyInput] = useState(true);
  const showReplies = displayRepliesForComment === comment.id;
  const [hideRepliesList, setHideRepliesList] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState([]);
  const [next, setNext] = useState(null);
  const [repliesLoading, setRepliesLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countReplies, setCountReplies] = useState(comment.repliesCount);

  const isAuthenticated = useSelector((state) => state.account.token !== "");
  const showAuthModal = useAuthenticationModal();
  const service = new CommentService();

  useEffect(() => showReplies ? displayReplies() : "",[]);
  async function fetchCommentReplies(){
    setRepliesLoading(true);
    try {
      const response = await service.fetchReplies({commentId: comment.id, next});
      setRepliesLoading(false);
      setReplies([...replies, ...response.data]);
      // later on when we include pagination
      // setNext(response.data.next);
    } catch (err) {
      addToast(
        "Error Occured while trying to create a reply check your internet connection please!",
        { appearance: "error" }
      );
      setRepliesLoading(false);
    } 
  }

  function handleChange(e){
    setReplyText(e.target.value);
  }

  function handleKeyDown(e){
    // Submit the reply if the user hits enter.
    if (e.key === "Enter") isAuthenticated ? createReply() : showAuthModal();
  }

  async function createReply(){
    setIsLoading(true);
    if (replyText){
      try {
        const response = await service.addReply({commentId: comment.id, data: {text: replyText}});
        setIsLoading(false);
        setHideRplyInput(true);
        setReplyText("");
        const newCount = countReplies+1;
        setCountReplies(newCount);
        setReplies([response.data, ...replies])
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

  function displayReplies(){
    if (!replies.length){
      fetchCommentReplies();
    }
    setHideRepliesList(!hideRepliesList);
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
      {countReplies ?
        <>
          |
          <TotalReplies 
            onClick={isAuthenticated ? displayReplies : showAuthModal}
            > 
            Total Replies ({countReplies}) 
          </TotalReplies>
        </> : ""
      }
      </Actions>
      {!hideReplyInput ?
        <Wrapper {...props}>
          <CommentControl
            placeholder="Write your reply..."
            className="bg-white"
            value={replyText}
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
      {
        !hideRepliesList ?
        repliesLoading ? <Loading size="sm" /> 
        : <RepliesList replies={replies} /> : ""
      }
    </div>
  );
}

Comment.propTypes = {
  // The comment which we're rendering.
  comment: PropTypes.object.isRequired
};

export default Comment;
