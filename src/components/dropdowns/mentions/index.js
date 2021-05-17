import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import UsersService from "features/users/service";
import NavDropdown from "react-bootstrap/NavDropdown";
import NotificationIcon from "images/icons/notification.png";
import { listNotifications, partialUpdateNotifications  } from "features/notifications/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from 'react-toast-notifications';
import { getProjectUrl } from "../../../utils/projects";
import { useNavigate } from "@reach/router";

const StyledDropDownItem = styled.div`
  display: flex;
  background-color: white;
  margin-bottom: 2px;
  margin-top: 2px;
  padding: 15px 30px 15px 15px;
  border-radius: 5px;
  position: relative;
  white-space: normal;
  font-size: 14px;
  align-items: center;
  cursor: pointer;
  &:hover,
  &:active,
  &:focus {
    background-color: #f7f7f7 !important;
    color: black !important;
  }
  &.active {
    color: black;
  }
`;

const ImageWrapper = styled.div`
  width : 50px;
  border-radius: 50%;
  margin-right: 10px;
  img {
    width: 100%;
    border-radius: 50%;
    box-shadow: 2px 2px 1px #ccc;
  }
`;

function MentionsDropDown({ isShown, username }) {
  // Provides the a dropdown for the list of mentions when user want to mention another user in a comment
  const [isLoading, setIsLoading] =  useState(false);
  const [usersList, setUserList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const service = new UsersService();
  const { addToast } = useToasts();
  useEffect(() => {
    setIsLoading(true);
    fetchUserList();
  }, []);

  useEffect(() => setSearchList([...usersList.filter(user => user.username.includes(username))]), [username, usersList])

  async function fetchUserList(){
    try{
        const response = await service.list();
        console.log(response);
        setUserList(response.data);
        setIsLoading(false);
    } catch (err) {
        setIsLoading(false);
        addToast("Error occured while searching for a user", {appearance: 'error', autoDismiss: true});
    }
  }

  if (isShown) {
    return (
          <>
            {isLoading ? <div> Loading... </div> : 
              searchList.map(user => {
                return (
                  <StyledDropDownItem
                  key={user.id}
                  onClick={() => {
                    // redirectToNotificationUrl(notification);
                  }}
                >
                  <ImageWrapper>
                   <img src={user.image} />
                  </ImageWrapper>
                  <div>
                    {user.username}
                  </div>
                </StyledDropDownItem>  
                )
               }
              )
            }
          </>
      );
  } else {
      return null;
  }

}

MentionsDropDown.propTypes = {
  isShown: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
};

export default MentionsDropDown;
