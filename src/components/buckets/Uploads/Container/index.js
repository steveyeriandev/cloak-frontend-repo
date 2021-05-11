import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

import BucketUpload from "components/buckets/Uploads/BucketUpload";
import EmptyData from "components/general/EmptyData";

const Wrapper = styled.div`
  margin-top: 20px;
`;

function BucketUploadContainer({ bucketUploads }) {
  /* Renders the top-layer container for the image bucket, to display the first image in each
     bucket upload.
  */
  function renderImages() {
    if (bucketUploads.length === 0)
      return (
        <EmptyData>
          Hit the plus to add image stacks, pdfs, or videos (100MB max size)
        </EmptyData>
      );

    return bucketUploads.map((bucketUpload) => (
      <Col sm={4} key={bucketUpload.id} className="my-3">
        <BucketUpload bucketUpload={bucketUpload} />
      </Col>
    ));
  }

  return (
    <Wrapper>
      <Row>{renderImages()}</Row>
    </Wrapper>
  );
}

BucketUploadContainer.propTypes = {
  bucketUploads: PropTypes.arrayOf(PropTypes.object),
};

export default BucketUploadContainer;
