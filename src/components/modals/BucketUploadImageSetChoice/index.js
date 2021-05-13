import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Image from "react-bootstrap/Image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faArrowRight,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

import BaseModal from "../Base";
import ModalHeader from "../Header";
import BigCheckbox from "components/controls/BigCheckbox";
import LoadingButton from "components/buttons/Loading";
import ButtonContainer from "components/forms/shared/ButtonContainer";
import { updateBucketUpload } from "features/bucketUploads/thunks";
import { bucketUploadType } from "utils/enums";
import GenericImage from "images/generic-image.png";
import GenericImageSet from "images/generic-image-set.png";

const ChoicesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChoiceContainer = styled.div`
  display: flex;
  flex-basis: 1;
  flex-grow: 1;
  align-items: center;
  margin: ${(props) => props.theme.spacing} 0;

  img {
    margin: ${(props) => props.theme.spacingSm};
  }
  svg {
    margin: ${(props) => props.theme.spacingLg};
  }

  img {
    box-shadow: ${(props) => props.theme.shadow};
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 33%;

  > p {
    margin-bottom: ${(props) => props.theme.spacing};
  }
`;

const WebComicImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const TapThroughContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

function BucketUploadImageSetChoiceModal({
  bucketUpload,
  showConfirmShareModal,
  ...props
}) {
  // Gives the user a choice of what layout they'd like their image set to be displayed in.
  const dispatch = useDispatch();
  const [isTapThrough, setIsTapThrough] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  function transitionToShare() {
    props.onHide();
    showConfirmShareModal();
  }

  async function handleSave() {
    // If the user wants a webcomic version, then we'll need to update the bucketUpload instance.
    if (isTapThrough) return transitionToShare();

    setIsUpdating(true);

    await dispatch(
      updateBucketUpload({
        stackId: bucketUpload.id,
        payload: {
          kind: bucketUploadType.comic,
        },
      })
    );

    setIsUpdating(false);
    transitionToShare();
  }

  return (
    <BaseModal {...props}>
      <ModalHeader title="Which format would you like your image stack?" />
      <ChoicesContainer>
        <ChoiceContainer>
          <CheckboxContainer>
            <p>Tap through</p>
            <BigCheckbox
              checked={isTapThrough}
              onClick={() => setIsTapThrough(true)}
            />
          </CheckboxContainer>
          <TapThroughContainer>
            <Image src={GenericImageSet} />
            <FontAwesomeIcon icon={faArrowRight} />
          </TapThroughContainer>
        </ChoiceContainer>
        <ChoiceContainer>
          <CheckboxContainer>
            <p>Web comic</p>
            <BigCheckbox
              checked={!isTapThrough}
              onClick={() => setIsTapThrough(false)}
            />
          </CheckboxContainer>
          <WebComicImageContainer>
            <Image src={GenericImage} />
            <Image src={GenericImage} />
            <FontAwesomeIcon icon={faArrowDown} />
          </WebComicImageContainer>
        </ChoiceContainer>
      </ChoicesContainer>
      <ButtonContainer className="p-3">
        <LoadingButton
          size="lg"
          onClick={handleSave}
          isLoading={isUpdating}
          width={150}
        >
          Continue <FontAwesomeIcon icon={faChevronRight} />
        </LoadingButton>
      </ButtonContainer>
    </BaseModal>
  );
}

BucketUploadImageSetChoiceModal.propTypes = {
  // The bucket upload that will be updated.
  bucketUpload: PropTypes.object.isRequired,

  // Transition to the confirm share modal, which needs to be called from outside of this modal.
  showConfirmShareModal: PropTypes.func.isRequired,
};

export default BucketUploadImageSetChoiceModal;
