import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import AuthorContainer from "components/general/AuthorContainer";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.gray300};
  padding: ${(props) => props.theme.spacing} ${(props) => props.theme.spacingLg};
`;

function BucketUploadHeader({ bucketUpload }) {
  return (
    <Wrapper>
      <AuthorContainer user={bucketUpload.createdBy} />
    </Wrapper>
  );
}

BucketUploadHeader.propTypes = {
  // The bucket upload to which the header is being attached.
  bucketUpload: PropTypes.object.isRequired,
};

export default BucketUploadHeader;
