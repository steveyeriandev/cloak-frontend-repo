import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import styled from "styled-components";

const StyledFormText = styled(Form.Text)`
  margin-bottom: ${(props) => props.theme.spacing};
  text-align: ${(props) => (props.$isField ? "left" : "center")};
`;

function FormErrorText({ text, isField, ...props }) {
  if (!text) return null;

  return (
    <StyledFormText $isField={isField} className="text-danger mb-3" {...props}>
      {text}
    </StyledFormText>
  );
}

FormErrorText.propTypes = {
  // The text that should be rendered for the error message.
  text: PropTypes.string,

  // Determines if this is for a field, or for the form in general.
  isField: PropTypes.bool,
};

FormErrorText.defaultProps = {
  isField: false,
};

export default FormErrorText;
