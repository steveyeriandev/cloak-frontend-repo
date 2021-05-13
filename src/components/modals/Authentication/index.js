/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";

import BaseModal from "components/modals/Base";
import LoginForm from "components/forms/Auth/Login";
import RegistrationForm from "components/forms/Auth/Registration";
import ForgotPasswordForm from "components/forms/Auth/ForgotPassword";
import ModalHeader from "components/modals/Header";

const AuthOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  > div {
    padding: 8px;
  }

  a {
    color: black;
    text-decoration: underline;
    font-weight: bold;
  }
`;

const AuthenticationModal = (props) => {
  const [authMode, setAuthMode] = useState("login");

  if (authMode === "login") {
    return (
      <BaseModal {...props}>
        <ModalHeader title="Log in with" />
        <Modal.Body className="pt-0">
          <LoginForm closeModal={props.onHide} />
          <AuthOptionsContainer>
            <div>
              No account?{" "}
              <a href="#" onClick={() => setAuthMode("register")}>
                Register now
              </a>
            </div>
            <div>
              Forgot password?{" "}
              <a href="#" onClick={() => setAuthMode("forgot")}>
                Click here
              </a>{" "}
              to reset.
            </div>
          </AuthOptionsContainer>
        </Modal.Body>
      </BaseModal>
    );
  } else if (authMode === "register") {
    return (
      <BaseModal {...props}>
        <ModalHeader title="Register" closeButton />
        <Modal.Body>
          <RegistrationForm closeModal={props.onHide} />
          <AuthOptionsContainer>
            <div>
              Already have an account?{" "}
              <a href="#" onClick={() => setAuthMode("login")}>
                Log in
              </a>{" "}
              here
            </div>
          </AuthOptionsContainer>
        </Modal.Body>
      </BaseModal>
    );
  } else if (authMode === "forgot") {
    return (
      <BaseModal {...props}>
        <ModalHeader title="Forgot Password" closeButton />
        <Modal.Body>
          <ForgotPasswordForm closeModal={props.onHide} />
          <AuthOptionsContainer>
            <div>
              Back to{" "}
              <a href="#" onClick={() => setAuthMode("login")}>
                Log in
              </a>
            </div>
          </AuthOptionsContainer>
        </Modal.Body>
      </BaseModal>
    );
  }
};

AuthenticationModal.propTypes = {
  hide: PropTypes.func,
};

export default AuthenticationModal;
