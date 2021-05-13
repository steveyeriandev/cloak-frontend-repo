import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import NavDropdown from "react-bootstrap/NavDropdown";
import { navigate } from "@reach/router";
import { useModal } from "react-modal-hook";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faSync,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

import FormModal from "components/modals/Form";
import AuthenticationModal from "components/modals/Authentication";
import ChangePasswordForm from "components/forms/Auth/ChangePassword";
import { logoutUser } from "features/accounts/slice";
import { clearProjects } from "features/projects/slice";
import { clearBuckets } from "features/buckets/slice";
import useProfileImage from "hooks/ProfileImage";
import NotificationIcon from "images/icons/notification.png";

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
`;

const StyledNotIcon = styled.img`
  @media (max-width: ${(props) => props.theme.smBreakpoint}) {
    width: auto;
  }
  padding: 10px;
  background-color: ${(props) => props.theme.gray300};
  border-radius: ${(props) => props.theme.borderRadius};

`;

function NotificationsDropdown({ account, setExpanded }) {
  // Provides the a dropdown for the list of notifcations related to the logged in user.
 // <StyledNotIcon src={NotificationIcon} alt="Rad how to school notification" />
  const dispatch = useDispatch();
  const isAuthenticated = account.token !== "";
  const notsTest = ["Notification 01", "Notification 02", "Notification 03"]
  const [nots, setNots] = useState([...notsTest])
  if (isAuthenticated) {
    return (
        <StyledNavDropdown totalnots={4}
          title={<StyledNotIcon src={NotificationIcon} alt="Rad how to school notification" />}
          id="notifications-navbar-dropdown"
          alignRight
        >
            {nots.map(notification =>
                <NavDropdown.Item
                key={notification}
                onClick={() => {
                  setExpanded(false);
                }}
              >
                {notification}
              </NavDropdown.Item>    
            )}
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

  // Action to fire to let the navbar know that the dropdown is expanded.
  setExpanded: PropTypes.func.isRequired,
};

export default NotificationsDropdown;
