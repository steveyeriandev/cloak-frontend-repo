import React from "react";
import Card from "react-bootstrap/Card";
import styled from "styled-components";

const StyledCard = styled(Card)`
  height: 100%;
`;

function TierBucketsCard(props) {
  // Provides a parent card component for displaying a registration tier.
  return <StyledCard {...props}>{props.children}</StyledCard>;
}

export default TierBucketsCard;
