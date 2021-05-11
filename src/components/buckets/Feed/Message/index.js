import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Moment from "react-moment";
import Linkify from "react-linkify";
import { useModal } from "react-modal-hook";
import { Link } from "@reach/router";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import FeedMessageForm from "components/forms/FeedMessage";
import FormModal from "components/modals/Form";
import { deleteFeedMessage } from "features/feedMessages/thunks";
import { getUserImage } from "utils/users";
import FormButtonContainer from "components/forms/shared/ButtonContainer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const LeftContainer = styled.div`
  max-width: 50px;
`;

const RightContainer = styled.div`
  flex-grow: 1;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditIconContainer = styled.div`
  display: inline;
  background-color: ${(props) => props.theme.secondary};
  border-radius: ${(props) => props.theme.borderRadius};
  padding: ${(props) => props.theme.spacing} 10px;

  &:hover {
    cursor: pointer;
  }
`;

const ContentContainer = styled.div`
  a {
    word-break: break-all;
  }
`;

function Message({ feedMessage, canEdit }) {
  /* Displays a feedMessage in a class feed bucket. */
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const [showFeedMessageModal, hideFeedMessageModal] = useModal(() => {
    // Provide a two-part modal that allows the user to edit, delete and confirm deletion.

    const toggleConfirmDelete = () => setShowConfirmDelete(!showConfirmDelete);

    function handleDelete() {
      // Send the delete action and perform other cleanup tasks.
      dispatch(deleteFeedMessage({ feedMessageId: feedMessage.id }));
      addToast("Message deleted", { appearance: "success" });
      hideFeedMessageModal();
    }

    return showConfirmDelete ? (
      <FormModal title="Delete message" onHide={hideFeedMessageModal}>
        <p className="text-center">
          Are you sure you want to <b>permanently delete</b> this message?
        </p>
        <p className="text-muted">{feedMessage.message}</p>
        <FormButtonContainer>
          <Button variant="link" onClick={toggleConfirmDelete}>
            Cancel
          </Button>
          <Button variant="outline-danger" onClick={handleDelete}>
            Yes, delete
          </Button>
        </FormButtonContainer>
      </FormModal>
    ) : (
      <FormModal title="Edit message" onHide={hideFeedMessageModal}>
        <FeedMessageForm
          feedMessage={feedMessage}
          closeModal={hideFeedMessageModal}
          toggleConfirmDelete={toggleConfirmDelete}
        />
      </FormModal>
    );
  }, [showConfirmDelete, feedMessage]);

  function renderActions() {
    return (
      canEdit && (
        <EditIconContainer onClick={showFeedMessageModal}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </EditIconContainer>
      )
    );
  }

  return (
    <Wrapper className="p-2 m-2">
      <LeftContainer className="m-2">
        <Image fluid rounded src={getUserImage(feedMessage.createdBy)} alt="" />
      </LeftContainer>
      <RightContainer className="p-2">
        <TitleContainer className="mb-2">
          <div>
            <Link
              to={`/users/${feedMessage.createdBy.username}`}
              className="font-weight-bold text-dark"
            >
              {feedMessage.createdBy.firstName} {feedMessage.createdBy.lastName}
            </Link>
          </div>
          <div>
            <span className="text-muted mr-1">
              <Moment format="MM/DD/YYYY">{feedMessage.created}</Moment>
            </span>
            {renderActions()}
          </div>
        </TitleContainer>
        <ContentContainer>
          <Linkify>{feedMessage.message}</Linkify>
        </ContentContainer>
      </RightContainer>
    </Wrapper>
  );
}

Message.propTypes = {
  // The feed message object that is being rendered.
  feedMessage: PropTypes.object,

  // Determines if the user should see the edit icon.
  canEdit: PropTypes.bool.isRequired,
};

export default Message;
