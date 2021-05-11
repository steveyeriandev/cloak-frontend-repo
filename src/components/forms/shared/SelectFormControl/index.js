import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

function SelectFormControl({ choices, ...props }) {
  // Provides a select control to be used in a form.
  function renderOptions() {
    return choices.map((obj) => (
      <option key={obj.value} value={obj.value}>
        {obj.label}
      </option>
    ));
  }

  return (
    <Form.Control as="select" {...props}>
      {renderOptions()}
    </Form.Control>
  );
}

SelectFormControl.propTypes = {
  // An object of key/value pairs to be used in the select options.
  choices: PropTypes.array.isRequired,
};

export default SelectFormControl;
