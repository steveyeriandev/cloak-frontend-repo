import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import NavDropdown from "react-bootstrap/NavDropdown";
import { navigate } from "@reach/router";
import { useToasts } from "react-toast-notifications";
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

const StyledNavDropdown = styled(NavDropdown)`
  margin-left: 10px;

  img {
    width: 40px !important;
  }
`;

function AccountDropdown({ account, setExpanded }) {
  // Provides the account dropdown for the user to select various actions at the acccount level.

  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const isAuthenticated = account.token !== "";

  const [showAuthModal, hideAuthModal] = useModal(() => (
    <AuthenticationModal show={true} onHide={hideAuthModal} />
  ));
  const profileImage = useProfileImage({ rounded: true });

  const [showChangePasswordModal, hideChangePasswordModal] = useModal(() => {
    return (
      <FormModal title="Change password" onHide={hideChangePasswordModal}>
        <ChangePasswordForm closeModal={hideChangePasswordModal} />
      </FormModal>
    );
  });

  function dispatchUserLogout() {
    return addToast(
      "You're now logged out, see you soon!",
      {
        appearance: "success",
        autoDismiss: true,
      },
      () => {
        dispatch(logoutUser());
        dispatch(clearBuckets());
        dispatch(clearProjects());
        navigate("/");
      }
    );
  }

  function renderAuthenticationAction() {
    // Renders the actions in the account dropdown that are dynamic based on if authenticated.
    if (isAuthenticated)
      return (
        <>
          <NavDropdown.Item
            onClick={() => {
              showChangePasswordModal();
              setExpanded(false);
            }}
          >
            <FontAwesomeIcon icon={faSync} /> Change password
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              setExpanded(false);
              navigate(`/users/${account.user.username}`);
            }}
          >
            <FontAwesomeIcon icon={faUserCircle} /> Profile
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              dispatchUserLogout();
              setExpanded(false);
            }}
          >
            <FontAwesomeIcon icon={faLock} /> Logout
          </NavDropdown.Item>
        </>
      );
    else
      return (
        <NavDropdown.Item onClick={showAuthModal}>
          <FontAwesomeIcon icon={faUserCircle} /> Login
        </NavDropdown.Item>
      );
  }

  return (
    <StyledNavDropdown
      title={profileImage}
      id="account-navbar-dropdown"
      alignRight
    >
      {renderAuthenticationAction()}
    </StyledNavDropdown>
  );
}

AccountDropdown.propTypes = {
  // The account state of the user.
  account: PropTypes.object.isRequired,

  // Action to fire to let the navbar know that the dropdown is expanded.
  setExpanded: PropTypes.func.isRequired,
};

export default AccountDropdown;
