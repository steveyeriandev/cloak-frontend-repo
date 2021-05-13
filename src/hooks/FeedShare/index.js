import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "react-modal-hook";

import ConfirmActionModal from "components/modals/ConfirmAction";
import FormModal from "components/modals/Form";
import PostForm from "components/forms/Post";

function useFeedShare(modelName, title, objectId) {
  /*
  Provides shared functionality for sharing an object to the site feed.

  There are a couple parts involved here, first the user confirms they want to share, and then they
  create the post by adding a description.
  */

  const contentType = useSelector((state) => {
    return state.contentTypes.entities.find((ct) => ct.model === modelName).id;
  });

  const [showCreatePostModal, hideCreatePostModal] = useModal(() => {
    return (
      <FormModal title="Write a caption..." onHide={hideCreatePostModal}>
        <PostForm
          closeModal={hideCreatePostModal}
          post={{ contentType, objectId }}
        />
      </FormModal>
    );
  }, [objectId]);

  const [showConfirmShareModal, hideConfirmShareModal] = useModal(() => {
    function handleShareAction() {
      hideConfirmShareModal();
      showCreatePostModal();
    }

    let message =
      "Now you can share your work to the feed, with all users on the site!";

    if (modelName === "project")
      message +=
        'If you choose "Not now", your project will still remain public until you turn it private.';

    return (
      <ConfirmActionModal
        title={title}
        confirmText="Yes, share"
        confirmAction={handleShareAction}
        declineText="Not now"
        confirmIcon={faShare}
        onHide={hideConfirmShareModal}
      >
        <p>{message}</p>
      </ConfirmActionModal>
    );
  });

  return showConfirmShareModal;
}

useFeedShare.propTypes = {
  // The model name that we're checking if the user wants to share.
  modelName: PropTypes.string.isRequired,

  // The object id that we're checking if the user wants to share.
  objectId: PropTypes.number.isRequired,

  // The title that should be shown on the initial modal.
  title: PropTypes.string.isRequired,
};

export default useFeedShare;
