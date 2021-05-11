import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import GoogleAuthButton from "components/buttons/GoogleAuthButton";

const Wrapper = styled.div`
  display: block;
  display: flex;
  justify-content: center;
`;

function SocialAuthenticationContainer({ closeModal }) {
  /* Social authentication container to place with our authentication forms. */
  return (
    <Wrapper>
      <GoogleAuthButton closeModal={closeModal} />
    </Wrapper>
  );
}

SocialAuthenticationContainer.propTypes = {
  closeModal: PropTypes.func,
};

export default SocialAuthenticationContainer;
