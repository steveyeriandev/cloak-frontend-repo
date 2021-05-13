import React from "react";
import PropTypes from "prop-types";
import Image from "react-bootstrap/Image";
import styled from "styled-components";

import LoadingContainer from "components/loading/Container";
import CommentContainer from "components/comments/Container";
import BucketUploadHeader from "components/buckets/Uploads/Header";
import useFetchBucketUploadImages from "hooks/FetchBucketUploadImages";
import useGetContentTypeObj from "hooks/GetContentTypeObj";
import BaseModal from "../Base";

const ImageContainer = styled.div`
  height: 80vh;
  overflow-y: scroll;

  @media (max-width: ${(props) => props.theme.smBreakpoint}) {
    height: 60vh;
  }

  > img {
    &:first-of-type {
      border-top-left-radius: ${(props) => props.theme.borderRadius};
      border-top-right-radius: ${(props) => props.theme.borderRadius};
    }
  }
`;

function WebComicModal({ bucketUpload, ...props }) {
  // Displays an image set in the form of a web comic (vertical scroll)
  const [isLoading, images] = useFetchBucketUploadImages(bucketUpload);
  const contentTypeObj = useGetContentTypeObj("bucketupload");

  function renderImages() {
    if (isLoading) return <LoadingContainer />;

    return images.map((image) => <Image src={image.image} fluid alt="" />);
  }

  return (
    <BaseModal {...props} size="md">
      <BucketUploadHeader bucketUpload={bucketUpload} />
      <ImageContainer>{renderImages()}</ImageContainer>
      <CommentContainer
        contentObject={bucketUpload}
        contentTypeObj={contentTypeObj}
      />
    </BaseModal>
  );
}

WebComicModal.propTypes = {
  // The bucket upload object that we're displaying.
  bucketUpload: PropTypes.object.isRequired,
};

export default WebComicModal;
