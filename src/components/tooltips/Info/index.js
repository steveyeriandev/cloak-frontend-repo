import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import Tooltip from "components/tooltips/Tooltip";

function InfoTooltip({ withPaddingBottom, iconProps, ...props }) {
  // Displays a highly used info tooltip.
  return (
    <Tooltip {...props}>
      <span className="mx-2">
        <FontAwesomeIcon
          {...iconProps}
          icon={faInfoCircle}
          style={{ opacity: 0.8 }}
        />
      </span>
    </Tooltip>
  );
}

InfoTooltip.propTypes = {
  // Determines if the image should have padding bottom, moving it up inline with other text.
  withPaddingBottom: PropTypes.bool,

  // Additional properties to pass to the icon component.
  iconProps: PropTypes.object,
};

InfoTooltip.defaultProps = {
  withPaddingBottom: false,
};

export default InfoTooltip;
