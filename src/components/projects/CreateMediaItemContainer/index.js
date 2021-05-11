import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

import Loading from "components/loading/Loading";
import { createMediaItem } from "features/mediaItems/thunks";

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.gray200};
  border: 2px solid ${(props) => props.theme.gray300};
  border-radius: ${(props) => props.theme.borderRadius};
  transition: background-color 0.3s ease;
  height: 100%;
  min-height: ${(props) => props.minHeight}px;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.gray300};
  }
`;

function CreateMediaItemContainer({ minHeight, mediaBlock }) {
  // Provides a container that upon click will prompt the user to add a media item.
  const [isCreating, setIsCreating] = useState(false);
  const dispatch = useDispatch();

  async function handleNewBlockItem(event) {
    setIsCreating(true);
    const file = event.target.files[0];
    let formData = new FormData();
    formData.append("block", mediaBlock.id);
    formData.append("image", file);
    await dispatch(createMediaItem(formData));
    setIsCreating(false);
  }

  function renderCreateIcon() {
    // Returns the icon to show in the create container, depending on if it's loading.
    return isCreating ? (
      <Loading />
    ) : (
      <FontAwesomeIcon icon={faPlus} size="3x" />
    );
  }

  return (
    <>
      <label htmlFor="new-block-item" className="w-100 h-100">
        <InnerContainer minHeight={minHeight}>
          {renderCreateIcon()}
        </InnerContainer>
      </label>
      <input
        id="new-block-item"
        type="file"
        onChange={handleNewBlockItem}
        className="d-none"
      />
    </>
  );
}

CreateMediaItemContainer.propTypes = {
  // The media block that we'll be creating a new item in.
  mediaBlock: PropTypes.object.isRequired,

  // The minimum height that the container should be, depending on where we're rendering.
  minHeight: PropTypes.number,
};

CreateMediaItemContainer.defaultProps = {
  minHeight: 140,
};

export default CreateMediaItemContainer;
