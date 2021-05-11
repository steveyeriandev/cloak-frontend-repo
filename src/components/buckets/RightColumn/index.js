import React from "react";
import styled from "styled-components";
import Col from "react-bootstrap/Col";

const StyledCol = styled(Col)`
  background-color: white;

  @media (min-width: ${(props) => props.theme.smBreakpoint}) {
    min-height: calc(100vh - ${(props) => props.theme.withBucketBar});

    &:after {
      background-color: white;
      right: -999em;
      content: "";
      display: block;
      position: absolute;
      width: 999em;
      top: 0;
      bottom: 0;
    }
  }
`;

function BucketRightColumn(props) {
  /* Creates a styled column to go on the right side of a bucket, so that the right side of the
     screen can be a different color than the left.

     https://stackoverflow.com/questions/43348829/background-color-different-on-either-side-of-container
  */

  return <StyledCol>{props.children}</StyledCol>;
}

export default BucketRightColumn;
