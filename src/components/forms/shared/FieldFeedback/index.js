import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

import FormErrorText from "../ErrorText";

function FieldFeedback({ field, isCustomControl, rules, ...props }) {
  // Provides a field feedback component to display field messages on a form.
  if (field === undefined) return null;

  function getErrorText() {
    if (!field) return null;

    if (field.message) return field.message;

    switch (field.type) {
      case "required":
        return "Required";
      case "maxLength":
        return `Please limit to ${rules.maxLength} characters`;
      case "manual":
        return Array.isArray(field.message) ? field.message[0] : field.message;
      default:
        return "Invalid";
    }
  }

  return isCustomControl ? (
    <FormErrorText text={getErrorText()} isField={isCustomControl} />
  ) : (
    <Form.Control.Feedback type="invalid" {...props}>
      {getErrorText()}
    </Form.Control.Feedback>
  );
}

FieldFeedback.propTypes = {
  // The field object that we're rendering.
  field: PropTypes.object.isRequired,

  // When we don't use Form.Control (such as select or datepicker), then we need to render the
  // message differently.
  isCustomControl: PropTypes.bool,

  // Gives us the rules object for the control
  rules: PropTypes.object,
};

FieldFeedback.defaultProps = {
  isCustomControl: false,
  rules: {},
};

export default FieldFeedback;
