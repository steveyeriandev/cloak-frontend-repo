import React from "react";
import styled from "styled-components";
import FormCheck from "react-bootstrap/FormCheck";

const StyledCheckbox = styled(FormCheck.Input)`
  transform: scale(1.5);
  position: relative;
  margin: 0;

  &:hover {
    cursor: pointer;
  }
`;

function BigCheckbox(props) {
  // Returns a larger checkbox element.
  return <StyledCheckbox type="checkbox" {...props} />;
}

export default BigCheckbox;
