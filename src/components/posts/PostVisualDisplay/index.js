import React from "react";
import PropTypes from "prop-types";
import Image from "react-bootstrap/Image";
import styled from "styled-components";
import { useModal } from "react-modal-hook";
import { useDispatch } from "react-redux";

import BucketUploadModal from "components/modals/BucketUpload";
import WebComicModal from "components/modals/WebComic";
import ImageStackCarousel from "components/carousels/ImageStack";
import { bucketUploadType } from "utils/enums";
import PdfIcon from "images/icons/pdf.png";
import GenericProjectImage from "images/project-generic.jpg";
import { fetchBucketUpload } from "features/bucketUploads/thunks";

const FileContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  > img:hover {
    cursor: pointer;
  }
`;

const StyledVideo = styled.video`
  width: 100%;
`;

const ClickablePostImage = styled(Image)`
  &:hover {
    cursor: pointer;
  }
`;

function PostVisualDisplay({ contentType, contentObject, showGenericProject }) {
  // Provides the visual portion of a shared post in public feed or in the post modal.

  const dispatch = useDispatch();

  function openPdf(pdfUrl) {
    // Opens the pdf file in new tab.
    const newWindow = window.open(pdfUrl, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  }

  const [showWebComicModal, hideWebComicModal] = useModal(() => {
    return (
      <WebComicModal onHide={hideWebComicModal} bucketUpload={contentObject} />
    );
  });

  const [showBucketUploadModal, hideBucketUploadModal] = useModal(() => {
    return (
      <BucketUploadModal
        bucketUpload={contentObject}
        onHide={hideBucketUploadModal}
      >
        <ImageStackCarousel bucketUpload={contentObject} />
      </BucketUploadModal>
    );
  });

  function launchImageStackCarousel() {
    // Opens the carousel to view the sorted images in the bucket upload.
    dispatch(fetchBucketUpload(contentObject.id));
    showBucketUploadModal(contentObject);
  }

  if (contentType.model === "project") {
    return (
      <Image
        src={
          contentObject.image ||
          (showGenericProject ? GenericProjectImage : null)
        }
        fluid
        alt=""
      />
    );
  } else if (contentType.model === "bucketupload") {
    // For each type of bucket upload, we have a different type of render.
    if (contentObject.kind === bucketUploadType.imageStack) {
      const imageSrc = contentObject.coverImage
        ? contentObject.coverImage.image
        : contentObject.images[0].image;

      return (
        <ClickablePostImage
          fluid
          src={imageSrc}
          alt=""
          onClick={launchImageStackCarousel}
        />
      );
    } else if (contentObject.kind === bucketUploadType.comic) {
      const imageSrc = contentObject.coverImage
        ? contentObject.coverImage.image
        : contentObject.images[0].image;
      return (
        <ClickablePostImage
          fluid
          src={imageSrc}
          alt=""
          onClick={showWebComicModal}
        />
      );
    } else if (contentObject.kind === bucketUploadType.pdf)
      return (
        <FileContainer>
          <Image
            src={PdfIcon}
            alt=""
            className="w-50"
            onClick={() => openPdf(contentObject.uploadFile)}
          />
        </FileContainer>
      );
    else if (contentObject.kind === bucketUploadType.video)
      return (
        <StyledVideo controls name="media">
          <source src={contentObject.uploadFile} type="video/mp4" />
        </StyledVideo>
      );
    else if (contentObject.kind === bucketUploadType.audio)
      return (
        <FileContainer>
          <audio controls>
            <source src={contentObject.uploadFile} type="audio/mpeg" />
          </audio>
        </FileContainer>
      );
    else return null;
  } else return null;
}

PostVisualDisplay.propTypes = {
  // The content object of the post that we're rendering.
  contentObject: PropTypes.object.isRequired,

  // The content type object of the post that we're rendering.
  contentType: PropTypes.object.isRequired,

  // Determines if we should show the generic poster image.
  showGenericProject: PropTypes.bool,
};

PostVisualDisplay.defaultProps = {
  showGenericProject: false,
};

export default PostVisualDisplay;
