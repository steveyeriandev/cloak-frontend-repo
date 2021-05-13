import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import NavDropdown from "react-bootstrap/NavDropdown";
import { navigate } from "@reach/router";
import { useToasts } from "react-toast-notifications";
import { useModal } from "react-modal-hook";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import Nav from "react-bootstrap/Nav";

import FormModal from "components/modals/Form";
import ChangePasswordForm from "components/forms/Auth/ChangePassword";
import { logoutUser } from "features/accounts/slice";
import { clearProjects } from "features/projects/slice";
import { clearBuckets } from "features/buckets/slice";
import { fetchNotifications, updateNotifications, updatePartialNotifications } from "features/notifications/thunks";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  createUploadSession,
  incrementUploadCount,
  resetUploadSession,
} from "features/notifications/slice";

const StyledNavDropdown = styled(NavDropdown)`
  margin-left: 10px;
  .dropdown-menu {
    min-width: 400px;
  }

  img {
    width: 40px !important;
  }
`;
const MainNavLink = styled.div`
  background-color: ${(props) => props.theme.gray300};
  border-radius: ${(props) => props.theme.borderRadius};
  color: black;
  padding: 5px 10px !important;
  font-size: 1.3rem;

  &:hover {
    color: black;
  }
`;

function NotificationDropdown({ account, setExpanded }) {
  // Provides the account dropdown for the user to select various actions at the acccount level.

  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const isAuthenticated = account.token !== "";

  const cursor = 10;

  useEffect(() => {
    async function listNotifications() {
      await dispatch(fetchNotifications(cursor));
    }
    listNotifications();
  }, []);


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
              setExpanded(false);
              navigate(`/users/${account.user.username}`);
            }}
          >
            <Row>
            <Col sm={2}>
              <Image
                roundedCircle 
                src={'https://cloak-local.s3.amazonaws.com/uploads/users/2/brians.jpg'}
                className="d-none d-md-block"
              />
            </Col>
            <Col sm={8}>
              {'This is a notificaiton'}
            </Col>
            </Row>
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              setExpanded(false);
              navigate(`/users/${account.user.username}`);
            }}
          >
            <Row>
            <Col sm={2}>
              <Image
                roundedCircle 
                src={'https://cloak-local.s3.amazonaws.com/uploads/users/2/brians.jpg'}
                className="d-none d-md-block"
              />
            </Col>
            <Col sm={8}>
              {'This is a notificaiton'}
            </Col>
            </Row>
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              setExpanded(false);
              navigate(`/users/${account.user.username}`);
            }}
          >
            <Row>
            <Col sm={2}>
              <Image
                roundedCircle 
                src={'https://cloak-local.s3.amazonaws.com/uploads/users/2/brians.jpg'}
                className="d-none d-md-block"
              />
            </Col>
            <Col sm={8}>
              {'This is a notificaiton'}
            </Col>
            </Row>
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              setExpanded(false);
              navigate(`/users/${account.user.username}`);
            }}
          >
            <Row>
            <Col sm={2}>
              <Image
                roundedCircle 
                src={'https://cloak-local.s3.amazonaws.com/uploads/users/2/brians.jpg'}
                className="d-none d-md-block"
              />
            </Col>
            <Col sm={8}>
              {'This is a notificaiton'}
            </Col>
            </Row>
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              setExpanded(false);
              navigate(`/users/${account.user.username}`);
            }}
          >
            <Row>
            <Col sm={2}>
              <Image
                roundedCircle 
                src={'https://cloak-local.s3.amazonaws.com/uploads/users/2/brians.jpg'}
                className="d-none d-md-block"
              />
            </Col>
            <Col sm={8}>
              {'This is a notificaiton'}
            </Col>
            </Row>
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              setExpanded(false);
              navigate(`/users/${account.user.username}`);
            }}
          >
            <Row>
            <Col sm={2}>
              <Image
                roundedCircle 
                src={'https://cloak-local.s3.amazonaws.com/uploads/users/2/brians.jpg'}
                className="d-none d-md-block"
              />
            </Col>
            <Col sm={8}>
              {'This is a notificaiton'}
            </Col>
            </Row>
          </NavDropdown.Item>
        </>
      );
  }

  return (
    <StyledNavDropdown
      title={<MainNavLink><FontAwesomeIcon icon={faComments} /></MainNavLink>}
      id="account-navbar-dropdown"
      alignLeft
      onToggle={console.log('test')}
    >
      {renderAuthenticationAction()}
    </StyledNavDropdown>
  );
}

NotificationDropdown.propTypes = {
  // The account state of the user.
  account: PropTypes.object.isRequired,

  // Action to fire to let the navbar know that the dropdown is expanded.
  setExpanded: PropTypes.func.isRequired,
};

export default NotificationDropdown;
