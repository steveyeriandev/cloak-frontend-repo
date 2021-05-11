import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Image from "react-bootstrap/Image";
import styled from "styled-components";

import BucketUploadService from "features/bucketUploads/service";
import LoadingContainer from "components/loading/Container";
import BaseModal from "../Base";

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;

  > img {
    &:first-of-type {
      border-top-left-radius: ${(props) => props.theme.borderRadius};
      border-top-right-radius: ${(props) => props.theme.borderRadius};
    }

    &:last-of-type {
      border-bottom-left-radius: ${(props) => props.theme.borderRadius};
      border-bottom-right-radius: ${(props) => props.theme.borderRadius};
    }
  }
`;

function WebComicModal({ bucketUpload, ...props }) {
  // Displays an image set in the form of a web comic (vertical scroll)
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const service = new BucketUploadService();
    async function fetchImages() {
      // Fetches the image data for the comic.
      const response = await service.fetch(bucketUpload.id);
      setImages(response.data.images);
      setIsLoading(false);
    }

    setIsLoading(true);
    fetchImages();
  }, [bucketUpload.id]);

  if (isLoading) return <LoadingContainer />;

  function renderImages() {
    return images.map((image) => <Image src={image.image} alt="" />);
  }

  return (
    <BaseModal {...props} size="lg">
      <ImageContainer>{renderImages()}</ImageContainer>
    </BaseModal>
  );
}

WebComicModal.propTypes = {
  // The bucket upload object that we're displaying.
  bucketUpload: PropTypes.object.isRequired,
};

export default WebComicModal;
