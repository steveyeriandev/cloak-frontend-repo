import React from "react";
import PropTypes from "prop-types";
import { useModal } from "react-modal-hook";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import BucketUploadModal from "components/modals/BucketUpload";
import ImageStackCarousel from "components/carousels/ImageStack";
import RemoveOverlayIcon from "components/general/RemoveOverlayIcon";
import DeleteBucketUploadModal from "components/modals/DeleteStackConfirmation";
import WebComicModal from "components/modals/WebComic";
import { fetchBucketUpload } from "features/bucketUploads/thunks";
import { bucketUploadType } from "utils/enums";
import StackImage from "../Display/StackImages";
import FileUploadDisplay from "../Display/FileUploadDisplay";

const Wrapper = styled.div`
  position: relative;
  height: 100%;

  &:hover {
    > .overlay-delete-section {
      display: block;
    }
  }

  @media (min-width: ${(props) => props.theme.smBreakpoint}) {
    > .overlay-delete-section {
      display: none;
    }
  }
`;

function BucketUpload({ bucketUpload }) {
  /* Renders an individual bucket upload component, which also leads to functionality depending on
     the bucket upload's type.

     1) An image stack will open up a modal to view the images in the stack
     2) A pdf bucket upload will expand the pdf to view it
     3) A video upload will create a video player to view the video player
     4) An audio upload will create an audio player to listen to the file
  */
  const dispatch = useDispatch();
  const [showBucketUploadModal, hideBucketUploadModal] = useModal(() => {
    return (
      <BucketUploadModal
        bucketUpload={bucketUpload}
        onHide={hideBucketUploadModal}
      >
        <ImageStackCarousel bucketUpload={bucketUpload} />
      </BucketUploadModal>
    );
  });
  const [showDeleteConfirmationModal, hideDeleteConfirmationModal] = useModal(
    () => {
      return (
        <DeleteBucketUploadModal
          show={true}
          onHide={hideDeleteConfirmationModal}
          bucketUpload={bucketUpload}
        />
      );
    }
  );
  const [showWebComicModal, hideWebComicModal] = useModal(() => {
    return (
      <WebComicModal onHide={hideWebComicModal} bucketUpload={bucketUpload} />
    );
  });

  const userState = useSelector((state) => state.account);
  const projectState = useSelector((state) => state.projects.detail);

  function launchImageStackCarousel() {
    // Opens the carousel to view the sorted images in the bucket upload.
    dispatch(fetchBucketUpload(bucketUpload.id));
    showBucketUploadModal(bucketUpload);
  }

  function renderDeleteSection() {
    // Only show the delete section if the user has access to delete the bucket upload.
    const isAuthenticated = userState.token !== "";

    if (!isAuthenticated) return null;

    const isTeacher = projectState.teachers.some(
      (teacher) => teacher.id === userState.user.id
    );
    const isCreator = bucketUpload.createdBy.id === userState.user.id;

    if (isCreator || isTeacher) {
      return <RemoveOverlayIcon onClick={showDeleteConfirmationModal} />;
    }

    return null;
  }

  function renderDisplayContent() {
    // Returns the content to display for the bucket upload.
    switch (bucketUpload.kind) {
      case bucketUploadType.imageStack:
        return (
          <StackImage stack={bucketUpload} onClick={launchImageStackCarousel} />
        );
      case bucketUploadType.comic:
        return <StackImage stack={bucketUpload} onClick={showWebComicModal} />;
      case bucketUploadType.pdf:
      case bucketUploadType.video:
      case bucketUploadType.audio:
        return <FileUploadDisplay bucketUpload={bucketUpload} />;
      default:
        return null;
    }
  }

  return (
    <Wrapper>
      {renderDeleteSection()}
      {renderDisplayContent()}
    </Wrapper>
  );
}

BucketUpload.propTypes = {
  // A bucket upload object, which can contain data for an image stack, pdf, video, etc.
  bucketUpload: PropTypes.object,
};

export default BucketUpload;
