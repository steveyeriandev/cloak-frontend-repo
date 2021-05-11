import React from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import InfoTooltip from "components/tooltips/Info";

function EmptyActionSection({ text, buttonText, buttonAction, tooltip }) {
  // Displays a section with empty data for the user to to perform some action.

  return (
    <Alert variant="light" className="text-center border">
      {text && <p>{text}</p>}
      <Button onClick={buttonAction} variant="light">
        {buttonText}
      </Button>
      {tooltip && <InfoTooltip text={tooltip} />}
    </Alert>
  );
}

EmptyActionSection.propTypes = {
  // The text to be displayed in the section.
  text: PropTypes.string,

  // The text to be shown for the action button.
  buttonText: PropTypes.string.isRequired,

  // The action to perform when the user clicks the action button.
  buttonAction: PropTypes.func.isRequired,

  // Tooltip text to be displayed with the empty action button.
  tooltip: PropTypes.string,
};

export default EmptyActionSection;
