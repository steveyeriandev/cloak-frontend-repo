import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";

import ResetPasswordForm from "components/forms/Auth/ResetPassword";

const FormContainer = styled.div`
  background-color: white;
  width: 50%;
`;

function ResetPasswordRoute(props) {
  return (
    <Container className="d-flex justify-content-center">
      <FormContainer className="p-3 m-5">
        <ResetPasswordForm {...props} />
      </FormContainer>
    </Container>
  );
}

ResetPasswordRoute.propTypes = {
  /* A secret value that determines the user. */
  uid: PropTypes.string,

  /* A secret token to hash the password request. */
  token: PropTypes.string,
};

export default ResetPasswordRoute;
