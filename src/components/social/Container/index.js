import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import SocialItem from "components/social/Item";

const Wrapper = styled.div`
  display: flex;

  :first-child {
    margin-left: 0;
  }
`;

function SocialContainer({ user }) {
  // Returns the social container for a given user.
  const { twitter, linkedin, facebook, instagram } = user;

  if (!twitter && !linkedin && !facebook && !instagram) return null;

  function renderSocialIcons() {
    const socialData = [];
    const socialApps = ["facebook", "instagram", "twitter", "linkedin"];

    socialApps.forEach((app) => {
      if (user[app] !== "") socialData.push({ type: app, handle: user[app] });
    });

    return socialData.map((data) => <SocialItem {...data} />);
  }

  return <Wrapper>{renderSocialIcons()}</Wrapper>;
}

SocialContainer.propTypes = {
  // The user for which we're displaying the social container.
  user: PropTypes.object.isRequired,
};

export default SocialContainer;
