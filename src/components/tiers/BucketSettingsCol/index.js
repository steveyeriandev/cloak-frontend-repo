import React from "react";
import Col from "react-bootstrap/Col";

function BucketSettingsCol(props) {
  // Provides a shared column component to be used in the bucket settings for card containers.
  return (
    <Col className="mb-4" sm={4} {...props}>
      {props.children}
    </Col>
  );
}

export default BucketSettingsCol;
