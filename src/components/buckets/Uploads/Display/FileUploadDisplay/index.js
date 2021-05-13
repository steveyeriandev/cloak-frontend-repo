import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useModal } from "react-modal-hook";

import BucketUploadModal from "components/modals/BucketUpload";
import { bucketUploadType } from "utils/enums";
import PdfIcon from "images/icons/pdf.png";
import VideoIcon from "images/icons/video.png";
import UploadDisplayContainer from "../Base";

const Wrapper = styled(UploadDisplayContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: background-color 0.3s ease;
  padding: 50px 0;

  @media (max-width: ${(props) => props.theme.smBreakpoint}) {
    padding: 70px 0;
  }

  &:hover {
    background-color: white;
    cursor: pointer;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`;

const StyledPdfImage = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

function FileUploadDisplay({ bucketUpload }) {
  const [showUploadModal, hideUploadModal] = useModal(() => {
    function getModalContent() {
      // Returns the content that should be displayed in the modal, which depends on the upload type.
      switch (bucketUpload.kind) {
        case bucketUploadType.video:
          return (
            <video autoPlay controls name="media" className="w-100">
              <source src={bucketUpload.uploadFile} type="video/mp4" />
            </video>
          );
        case bucketUploadType.pdf:
          return (
            <StyledPdfImage
              src={PdfIcon}
              alt=""
              style={{ width: "30%" }}
              onClick={openPdf}
              className="m-5"
            />
          );
        case bucketUploadType.audio:
          return (
            <audio controls className="m-5">
              <source src={bucketUpload.uploadFile} type="audio/mpeg" />
            </audio>
          );
      }
    }

    return (
      <BucketUploadModal onHide={hideUploadModal} bucketUpload={bucketUpload}>
        {getModalContent()}
      </BucketUploadModal>
    );
  });

  function getFilename() {
    // Returns the filename, given the pdf's path.
    const filenameStart = bucketUpload.uploadFile.lastIndexOf("/") + 1;
    return bucketUpload.uploadFile.slice(filenameStart);
  }

  function openPdf(e) {
    e.stopPropagation();

    // Opens the pdf file in new tab.
    const newWindow = window.open(
      bucketUpload.uploadFile,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  }

  function getContent() {
    // Return the content to show in the container, based on the upload type.
    switch (bucketUpload.kind) {
      case bucketUploadType.video:
        return <img src={VideoIcon} alt="" style={{ width: "50%" }} />;
      case bucketUploadType.pdf:
        return (
          <img
            src={PdfIcon}
            alt=""
            style={{ width: "50%" }}
            onClick={openPdf}
          />
        );
      case bucketUploadType.audio:
        return (
          <audio controls onClick={(e) => e.stopPropagation()}>
            <source src={bucketUpload.uploadFile} type="audio/mpeg" />
          </audio>
        );
      default:
        return null;
    }
  }

  return (
    <Wrapper onClick={showUploadModal} createdBy={bucketUpload.createdBy}>
      <InnerWrapper>
        <div className="mb-3">{getFilename()}</div>
        <div>{getContent()}</div>
      </InnerWrapper>
    </Wrapper>
  );
}

FileUploadDisplay.propTypes = {
  // The object that should be rendered.
  bucketUpload: PropTypes.object,
};

export default FileUploadDisplay;
