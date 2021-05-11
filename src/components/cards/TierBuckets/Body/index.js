import React from "react";
import Card from "react-bootstrap/Card";

function TierBucketCardBody(props) {
  return <Card.Body className="border-top">{props.children}</Card.Body>;
}

export default TierBucketCardBody;
