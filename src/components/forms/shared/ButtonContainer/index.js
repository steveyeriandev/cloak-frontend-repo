import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

function FormButtonContainer(props) {
  // Provides a container to show the buttons of a form.
  return <Wrapper {...props}>{props.children}</Wrapper>;
}

export default FormButtonContainer;
