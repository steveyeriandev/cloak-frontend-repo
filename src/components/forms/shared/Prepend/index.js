import React from "react";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import styled from "styled-components";

const StyledPrepend = styled(InputGroup.Prepend)`
  border-radius: ${(props) => props.theme.borderRadius};
`;

function Prepend({ text, ...props }) {
  return (
    <StyledPrepend {...props}>
      <InputGroup.Text>{text}</InputGroup.Text>
    </StyledPrepend>
  );
}

Prepend.propTypes = {
  // The text that should be rendered in prepend.
  text: PropTypes.string.isRequired,
};

export default Prepend;
