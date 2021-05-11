import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const IconBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.dark};
  border-radius: ${(props) => props.theme.borderRadius};
  width: 3rem;
  height: 3rem;

  > svg {
    width: 100%;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

function SocialItem({ type, handle }) {
  // Returns a single social item.

  function getFullUrl() {
    // Returns the full url to the application.
    switch (type) {
      case "twitter":
      case "facebook":
      case "instagram":
        return `https://${type}.com/${handle}`;
      case "linkedin":
        return `https://linkedin.com/in/${handle}`;
      default:
        return null;
    }
  }

  function openInNewTab() {
    const newWindow = window.open(
      getFullUrl(),
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  }

  function getIcon() {
    const iconProps = {
      color: "white",
      size: "2x",
    };

    switch (type) {
      case "twitter":
        return <FontAwesomeIcon icon={faTwitter} {...iconProps} />;
      case "facebook":
        return <FontAwesomeIcon icon={faFacebookF} {...iconProps} />;
      case "linkedin":
        return <FontAwesomeIcon icon={faLinkedinIn} {...iconProps} />;
      case "instagram":
        return <FontAwesomeIcon icon={faInstagram} {...iconProps} />;
      default:
        return null;
    }
  }

  return (
    <IconBackground className="p-1 mx-2" onClick={openInNewTab}>
      {getIcon()}
    </IconBackground>
  );
}

SocialItem.propTypes = {
  // The type of social icon that we should display.
  type: PropTypes.string.isRequired,

  // The handle of the user for the given social type.
  handle: PropTypes.string.isRequired,
};

export default SocialItem;
