import { useSelector, useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp  } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as regularFaThumbsUp } from "@fortawesome/free-regular-svg-icons";

import useAuthenticationModal from "hooks/AuthModal";
import { addLike } from "features/posts/thunks";


const StyledFontAwesomeLikeActivated = styled(FontAwesomeIcon)`
  cursor: pointer;
`
const TotalLikes = styled.div`
  color: ${props => props.theme.success};
  font-weight: 700;
  margin-left: 4px;
  margin-top: 4px;
  font-size: 20px;
  cursor: pointer;
`;

const Wrapper = styled.div`
margin-top: 10px;
  border-top: 1px solid ${props => props.theme.success};
  border-bottom: 1px solid ${props => props.theme.success};
  padding: 10px 10px;
  display: flex;
  align-items: center;
`;


function PostActions({post}){
  // reders the actions for a Post (likes, shares ...etc)

  const { 
      createdBy, 
      text, 
      contentObject, 
      contentType, 
      isLikedByCurrentUser, 
      likesCount
    } = post;
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const showAuthModal = useAuthenticationModal();
  const isAuthenticated = useSelector((state) => state.account.token !== "");
  
  async function handleLikeClick(){
    const action  =  await dispatch(addLike({postId: post.id}));
    if (action.type === "ADD_LIKE/rejected"){
      addToast("Error while liking a post", {
        appearance: "error",
      });
    }
  }

  return (
      <Wrapper>
        <StyledFontAwesomeLikeActivated 
          icon={isLikedByCurrentUser ? faThumbsUp : regularFaThumbsUp} 
          size="2x" 
          onClick={isAuthenticated ? handleLikeClick : showAuthModal}
        />
        <TotalLikes> ({likesCount}) </TotalLikes>
      </Wrapper>
  )
}

PostActions.prototype = {
  // The post object that we're rendering.
  post: PropTypes.object.isRequired
};

export default PostActions;