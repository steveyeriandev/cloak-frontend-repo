import React from "react";
import styled from "styled-components";

const Separator = styled.div`
  // https://stackoverflow.com/questions/2812770/add-centered-text-to-the-middle-of-a-hr-like-line

  display: flex;
  align-items: center;
  text-align: center;
  font-size: 20px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${(props) => props.theme.gray300};
  }

  &:not(:empty)::before {
    margin-right: 0.25em;
  }

  &:not(:empty)::after {
    margin-left: 0.25em;
  }
`;

function LineText(props) {
  // Provides a line separator with some text.
  return <Separator {...props}>{props.children}</Separator>;
}

export default LineText;
