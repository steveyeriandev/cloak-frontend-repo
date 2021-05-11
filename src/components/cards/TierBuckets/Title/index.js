import React from "react";
import Card from "react-bootstrap/Card";

function TierBucketCardTitle(props) {
  return (
    <Card.Title className={`m-3 ${props.className}`}>
      {props.children}
    </Card.Title>
  );
}

export default TierBucketCardTitle;
