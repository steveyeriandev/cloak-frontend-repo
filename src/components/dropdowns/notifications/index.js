import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import NavDropdown from "react-bootstrap/NavDropdown";
import NotificationIcon from "images/icons/notification.png";
import { listNotifications, partialUpdateNotifications  } from "features/notifications/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from 'react-toast-notifications';
import { getProjectUrl } from "../../../utils/projects";
import { useNavigate } from "@reach/router";

const StyledNavDropdown = styled(NavDropdown)`
    .dropdown-toggle::before{
    content: '${(props) => props.totalnots}';
    display: inline-block;
    width: 18px;
    height: 18px;
    font-size: 12px;
    text-align: center;
    -webkit-border-radius: 7.5px;
    border-radius: 7.5px;
    background-color: red;
    position: absolute;
    top: 5px;
    right: 5px;
    color: white;
  }
  a::after {
      content: none;
  }

  .dropdown-menu {
    max-height: 150px;
    overflow-y: auto;
  }
`;

const StyledLink = styled.a`
  margin: 0 10px;
  color: ${(props) => props.theme.dark};
`;

const StyledDropDownItem = styled(NavDropdown.Item)`
  background-color: ${(props) => props.seen ? "inherit" : "#d4f5ff"};
  margin-bottom: 2px;
  margin-top: 2px;
`;

const StyledNotIcon = styled.img`
  @media (max-width: ${(props) => props.theme.smBreakpoint}) {
    width: auto;
  }
  padding: 10px;
  background-color: ${(props) => props.theme.gray300};
  border-radius: ${(props) => props.theme.borderRadius};

`;

function NotificationsDropdown({ account }) {
  // Provides the a dropdown for the list of notifcations related to the logged in user.

  const  notifcationsState    = useSelector((state) => state.notifications);
  const projectState = useSelector((state) => state.projects);
  const { isLoading, entities} = notifcationsState;
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const triggerFetchNotifications = async () => {
    try {
      const action = await dispatch(listNotifications({"params": {}}));
      if (action.type === "LIST_NOTIFICATIONS/rejected") {
        addToast("Error occured while fetching notifications", {appearance: 'error', autoDismiss: true})
      }
    } catch(err) {
      addToast("Error occured while fetching notifications", {appearance: 'error', autoDismiss: true})
    }
  }

  const renderNotificationContent = (notification) =>{
    const actor = notification.action.actor ? notification.action.actor.firstName : "";
    
    if (notification.action.verb === "made a comment") {
      return `${actor} ${notification.action.verb} on ${notification.action.target.title}`;
    } else if (notification.action.verb === "mentioned") {
      return `${actor} has ${notification.action.verb} you`;
    } else {
      return ""
    }
  }

  const markNotificationAsSeen = async (notification) => {
    try {
      const action = await dispatch(partialUpdateNotifications({
        objectId: notification.id,
        data: {seen: true}
      }));
      if (action.type == "PATCH_NOTIFICATIONS/rejected"){
        addToast("Error occured while marking notification seen", {appearance: 'error', autoDismiss: true})
      }
    } catch (e) {
      addToast("Error occured while marking notification seen", {appearance: 'error', autoDismiss: true})
    }
  }

  const redirectToNotificationUrl = (notification) => {
    if (notification.action.verb === "made a comment") {
      let project = projectState.entities.classes.find((item) => notification.action.target.id === item.id);
      project = project ? project : projectState.entities.recordings.find((item) => notification.action.target.id === item.id);
      if (project) {
        const url = getProjectUrl(project);
        navigate(url);
      }
      
    return ""
   }
  }

  useEffect(() => {
    triggerFetchNotifications();
    setInterval(triggerFetchNotifications, 120000);
  }, []);

  const isAuthenticated = account.token !== "";
  const notificationsCount = entities ? entities.results ? entities.results.filter(entity => !entity.seen).length : 0 : 0;

  if (isAuthenticated) {
    return (
        <StyledNavDropdown totalnots={notificationsCount}
          title={<StyledNotIcon src={NotificationIcon} alt="Rad how to school notification" />}
          id="notifications-navbar-dropdown"
          alignRight
        >
          {isLoading ? "Loading" : notificationsCount ? 
            entities.results.map(notification =>
                <StyledDropDownItem
                seen={notification.seen ? "seen" : null}
                key={notification.id}
                onClick={() => {
                  markNotificationAsSeen(notification);
                  redirectToNotificationUrl(notification);
                }}
              >
                {renderNotificationContent(notification)}
              </StyledDropDownItem>    
            )
            : 
            ""
          }
        </StyledNavDropdown>
      );
  }
  else {
      return null
  }

}

NotificationsDropdown.propTypes = {
  // The account state of the user.
  account: PropTypes.object.isRequired,
};

export default NotificationsDropdown;
