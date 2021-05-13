import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import NavDropdown from "react-bootstrap/NavDropdown";
import { navigate } from "@reach/router";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faBell } from "@fortawesome/free-solid-svg-icons";
import { fetchNotifications } from "features/notifications/thunks";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { updatePartialNotifications } from "../../../features/notifications/thunks";

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
  background-color: ${(props) => props.unreadNotify ? 'red' : props.theme.gray300};
  border-radius: ${(props) => props.theme.borderRadius};
  color: ${(props) => props.unreadNotify ? 'white' : 'black'};
  padding: 5px 10px !important;
  font-size: 1.3rem;
`;

const UnreadIcon = styled.span`
  position: absolute;
  width: 16px;
  height: 16px;
  background: red;
  border-radius: 100%;
  border: 4px solid #ebecf0;
  right: 5px;
  top: 15px;
`;

function NotificationDropdown({ account, setExpanded }) {

  const dispatch = useDispatch();
  const isAuthenticated = account.token !== "";
  const notifyList = useSelector((state) => state.notifications.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, []);

  const [unreadNotify, hasUnreadNotify] = useState(false);

  useEffect(() => {
    if (notifyList) {
      const unreadItems = notifyList.filter(item => {
        if (!item.seen) {
          return item;
        }
      });
      hasUnreadNotify(unreadItems.length > 0);
    } else {
      hasUnreadNotify(false);
    }
  }, [notifyList]);

  const diffTime = (created) => {
    const createdTime = new Date(created);
    const now = new Date();
    let diff = (now.getTime() - createdTime.getTime()) / 1000;
    if (diff < 60) { // seconds
      return diff + ' seconds';
    } else if (diff < 3600) { // minutes
      return (diff / 60).toFixed(0) + ' minutes';
    } else if (diff < 86400) {
      return (diff / 3600).toFixed(0) + ' hours';
    } else {
      return (diff / 86400).toFixed(0) + ' days';
    }
  };

  const renderNotifyList = () => {
    // Renders the actions in the account dropdown that are dynamic based on if authenticated.
    if (isAuthenticated)
      return (
        <>
          {notifyList && notifyList.map((item, index) => (
            <NavDropdown.Item
              key={`notification_${index}`}
              onClick={() => {
                setExpanded(false);
                navigate(`/users/${account.user.username}`);
              }}
            >
              <Row style={{ position: 'relative' }}>
                <Col sm={2}>
                  <Image
                    roundedCircle
                    src={item.action.actor && item.action.actor.image}
                    className="d-none d-md-block"
                  />
                </Col>
                <Col sm={8}>
                  <div>
                    {item.action.actor && item.action.actor.firstName + ' ' + item.action.actor.lastName} {item.action.verb}
                  </div>
                  <span className=''>{diffTime(item.created)} ago</span>
                </Col>
                {!item.seen && <UnreadIcon />}
              </Row>
            </NavDropdown.Item>
          ))}
        </>
      );
  };

  const handleToggle = (toggle) => {
    if (!toggle && unreadNotify) {
      notifyList.map(item => {
        dispatch(updatePartialNotifications({
          notificationId: item.id,
          payload: { seen: true }
        }));
      })
    }
  };

  return (
    <StyledNavDropdown
      title={<MainNavLink unreadNotify={unreadNotify}><FontAwesomeIcon icon={faBell} /></MainNavLink>}
      id="account-navbar-dropdown"
      onToggle={handleToggle}
    >
      {renderNotifyList()}
    </StyledNavDropdown>
  );
}

NotificationDropdown.propTypes = {
  account: PropTypes.object.isRequired,
  setExpanded: PropTypes.func.isRequired,
};

export default NotificationDropdown;
