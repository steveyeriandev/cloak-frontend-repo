import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Prepend from "components/forms/shared/Prepend";

function PrependControl({ fieldProps, prependText, errorField, ...props }) {
  // Renders a control with a prepended value.
  return (
    <InputGroup className="mb-3" {...props}>
      <Prepend text={prependText} />
      <Form.Control isInvalid={errorField !== undefined} {...fieldProps} />
    </InputGroup>
  );
}

PrependControl.propTypes = {
  // The props for the field passed from react-hook-form.
  fieldProps: PropTypes.object.isRequired,

  // The text that should be rendered for the prepend.
  prependText: PropTypes.string.isRequired,

  // The react hook form error field for this input control.
  errorField: PropTypes.object,
};

export default PrependControl;
