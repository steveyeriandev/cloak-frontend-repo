import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import FileUploadInput from "../FileUploadInput";

const FileUploadWrapper = styled.div`
  > label {
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 50%;

    &:hover {
      background-color: #ffd699;
      border-color: #ffd699;
      transition: ${(props) => props.theme.transitionFast} ease all;
      cursor: pointer;
    }

    @media (max-width: ${(props) => props.theme.smBreakpoint}) {
      padding: 20px;
    }

    @media (min-width: ${(props) => props.theme.smBreakpoint}) {
      margin-right: 30px;
      padding: 30px;
    }
  }
`;

function FileUploader({ bucket }) {
  /* Provides a wrapper to upload images for an image stack. Most of the actual functionality is
     in the `FileUploadInput` since that's shared across other components.
  */

  return (
    <FileUploadWrapper>
      <label htmlFor="file-upload">
        <FontAwesomeIcon icon={faPlus} size="2x" className="mx-1" />
      </label>
      <FileUploadInput />
    </FileUploadWrapper>
  );
}

FileUploader.propTypes = {
  bucket: PropTypes.object,
};

export default FileUploader;
