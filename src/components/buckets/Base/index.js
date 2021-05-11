import React from "react";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import PropTypes from "prop-types";
import BucketUploadDropzone from "components/buckets/Uploads/BucketUploadDropzone";

const StyledContainer = styled(Container)`
  height: 100%;
  position: relative;

  // Special styling to allow different colors on each side of the container.
  > .row > div {
    padding-top: 20px;
    padding-bottom: 20px;
  }
`;

function BucketBase({ dropzone, children, props }) {
  /* Shared component for all the buckets to inherit from, so that we can have some standard
     functionality and styling between the buckets.
  */

  // We're either going to render just the inner portion of the bucket base, or we're going to wrap
  // it with the dropzone.
  const inner = <StyledContainer {...props}>{children}</StyledContainer>;

  if (dropzone) {
    return (
      <BucketUploadDropzone className="h-100">{inner}</BucketUploadDropzone>
    );
  }

  return inner;
}

BucketBase.propTypes = {
  // Determines if we should render a dropzone over the entire bucket area.
  dropzone: PropTypes.bool,
};

export default BucketBase;
