import { useSelector, useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart  } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularFaHeart } from "@fortawesome/free-regular-svg-icons";

import useAuthenticationModal from "hooks/AuthModal";
import { addLike } from "features/posts/thunks";


const StyledFontAwesomeLikeActivated = styled(FontAwesomeIcon)`
  cursor: pointer;
`
const TotalLikes = styled.div`
  color: ${props => props.theme.red};
  font-weight: 700;
  margin-left: 4px;
  margin-top: 4px;
  font-size: 16px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  border-bottom: 1px solid ${props => props.theme.success};
  padding: 10px;
  display: flex;
  align-items: center;
`;


function PostActions({post, ...props}){
  // reders the actions for a Post (likes, shares ...etc)

  const { 
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
          icon={isLikedByCurrentUser ? faHeart : regularFaHeart} 
          color="red"
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