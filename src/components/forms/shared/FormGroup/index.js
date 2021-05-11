import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

import FormLabelTooltip from "components/tooltips/FormLabel";
import FieldFeedback from "components/forms/shared/FieldFeedback";

function FormGroup({
  label,
  tooltip,
  tooltipText,
  errors,
  isCustomControl,
  ...props
}) {
  // Provides a standard component for rendering a field group.
  const tooltipComponent = tooltipText ? (
    <FormLabelTooltip text={tooltipText} />
  ) : (
    tooltip
  );

  return (
    <Form.Group {...props}>
      {label && (
        <Form.Label>
          {label} {tooltipComponent}
        </Form.Label>
      )}
      {props.children}
      <FieldFeedback
        field={errors}
        rules={
          props.children && props.children.props && props.children.props.rules
        }
        isCustomControl={isCustomControl}
      />
    </Form.Group>
  );
}

FormGroup.propTypes = {
  // The label to be displayed with the form group.
  label: PropTypes.string.isRequired,

  // The error object that should be render if it exists.
  errors: PropTypes.object,

  // When we have the standard tooltip, can pass in just the text instead of component.
  tooltipText: PropTypes.string,

  // An optional tooltip icon to display by the label.
  tooltip: PropTypes.object,

  // Determines if the control is a non-bootstrap control.
  isCustomControl: PropTypes.bool,
};

FormGroup.defaultProps = {
  tooltip: null,
  isCustomControl: false,
};

export default FormGroup;
