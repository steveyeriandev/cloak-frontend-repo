import React from "react";
import PropTypes from "prop-types";
import BsTooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function Tooltip({ text, ...props }) {
  // A general flexible tooltip that we can pass in the children and display a tooltip over it.
  function renderTooltip() {
    return <BsTooltip>{text}</BsTooltip>;
  }

  return (
    <OverlayTrigger placement="top" overlay={renderTooltip()} {...props}>
      {props.children}
    </OverlayTrigger>
  );
}

Tooltip.propTypes = {
  // The text that should be displayed in the tooltip.
  text: PropTypes.string.isRequired,
};

export default Tooltip;
