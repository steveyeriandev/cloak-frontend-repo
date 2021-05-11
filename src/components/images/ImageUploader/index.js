import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import LoadingContainer from "components/loading/Container";

const StyledImage = styled(Image)`
  &:hover {
    cursor: pointer;
  }
`;

const LabelContainer = styled.label`
  position: relative;

  &:hover {
    cursor: pointer;
  }

  &:hover > div {
    display: block;
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  height: 100%;
  width: 100%;
  display: none;
  border-radius: ${(props) => props.theme.borderRadius};
`;

const OverlayInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
`;

function ImageUploader({ action, actionPayload, imageSrc }) {
  // Provides an image that if clicked will upload another image.

  const dispatch = useDispatch();
  const [imageLoading, setImageLoading] = useState(false);
  const imageUploadRef = useRef();

  async function handleImageChange(event) {
    // Event handler for when we update the project image.
    setImageLoading(true);
    const file = event.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    await dispatch(action({ ...actionPayload, formData }));
    setImageLoading(false);
  }

  if (imageLoading) return <LoadingContainer />;

  function renderImage() {
    // Either show the project image or a loading spinner if it's being updated.
    if (imageLoading) return <LoadingContainer />;

    return imageSrc ? (
      <StyledImage fluid rounded src={imageSrc} alt="" />
    ) : (
      <Button className="mt-4" onClick={() => imageUploadRef.current.click()}>
        Upload image
      </Button>
    );
  }

  return (
    <>
      <LabelContainer htmlFor="image-input">
        {renderImage()}
        <Overlay>
          <OverlayInner>
            <FontAwesomeIcon icon={faPlusCircle} size="2x" className="mb-2" />
            Click to upload or replace image
          </OverlayInner>
        </Overlay>
      </LabelContainer>

      <input
        id="image-input"
        type="file"
        onChange={handleImageChange}
        ref={imageUploadRef}
        className="d-none"
      />
    </>
  );
}

ImageUploader.propTypes = {
  // The action to dispatch when picking a new image.
  action: PropTypes.func.isRequired,

  // The payload to send with the action.
  actionPayload: PropTypes.object,

  // The source of the image to show.
  imageSrc: PropTypes.string,
};

ImageUploader.defaultProps = {
  imageSrc: null,
  actionPayload: {},
};

export default ImageUploader;
