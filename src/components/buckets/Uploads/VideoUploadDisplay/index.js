import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import PdfIcon from "images/icons/pdf.png";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: background-color ${(props) => props.theme.transitionFast} ease;
  border-radius: ${(props) => props.theme.borderRadius};

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

function VideoUploadDisplay({ videoUpload }) {
  function getFilename() {
    // Returns the filename, given the pdf's path.
    const filenameStart = videoUpload.uploadFile.lastIndexOf("/") + 1;
    return videoUpload.uploadFile.slice(filenameStart);
  }

  return (
    <Wrapper>
      <InnerWrapper>
        <div className="mb-3">{getFilename()}</div>
        <div>
          <img src={PdfIcon} alt="" style={{ width: "50%" }} />
        </div>
      </InnerWrapper>
    </Wrapper>
  );
}

VideoUploadDisplay.propTypes = {
  videoUpload: PropTypes.object,
};

export default VideoUploadDisplay;
