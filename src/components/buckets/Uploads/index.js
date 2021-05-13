import React, { useEffect } from "react";
import PropTypes from "prop-types";
import BucketBase from "components/buckets/Base";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "react-modal-hook";

import BucketUploadImageSetChoiceModal from "components/modals/BucketUploadImageSetChoice";
import BucketUploadContainer from "components/buckets/Uploads/Container";
import LoadingContainer from "components/loading/Container";
import UploadBucketFooter from "components/navbars/UploadBucketFooter";
import useFeedShare from "hooks/FeedShare";
import { bucketUploadType } from "utils/enums";
import { isProjectAdmin } from "utils/projects";
import { resetUploadSession } from "features/imageUploadSession/slice";

function UploadsBucket({ bucket }) {
  // Displays the list of uploads for the bucket.

  const dispatch = useDispatch();
  const accountState = useSelector((state) => state.account);
  const isAuthenticated = accountState.token !== "";
  const project = useSelector((state) => state.projects.detail);
  const bucketUpload = useSelector((state) => {
    const currentBucket = state.buckets.entities.find(
      (_bucket) => _bucket.id === bucket.id
    );
    return currentBucket && currentBucket.stacks
      ? currentBucket.stacks[0]
      : null;
  });
  const uploadSession = useSelector((state) => state.imageUploadSession);

  const showConfirmShareModal = useFeedShare(
    "bucketupload",
    "Upload Successful!",
    bucketUpload ? bucketUpload.id : null
  );

  const [
    showBucketUploadFollowupModal,
    hideBucketUploadFollowupModal,
  ] = useModal(() => {
    return (
      <BucketUploadImageSetChoiceModal
        onHide={hideBucketUploadFollowupModal}
        bucketUpload={bucketUpload}
        showConfirmShareModal={showConfirmShareModal}
      />
    );
  }, [bucketUpload]);

  useEffect(() => {
    // Check if there was an upload session completed and then commence the follow up actions.
    if (uploadSession.status === "complete") {
      showBucketUploadFollowupModal();
      dispatch(resetUploadSession());
    }
  }, [
    showBucketUploadFollowupModal,
    dispatch,
    resetUploadSession,
    uploadSession.status,
  ]);

  if (bucket.stacks === undefined)
    return <LoadingContainer marginTop="150px" />;

  function getDisplayUploads() {
    /* Returns an array of uploads data that should be shown at a summary level in the bucket.
       Depening on the bucket upload kind, there is different logic of how twe should show it. (i.e.
       image stacks, pdf, video, etc)
    */
    return bucket.stacks.filter((bucketUpload) => {
      /* Here basically we need to check each type to make sure it has the required files to be
         displayed.
      */
      return (
        (bucketUpload.kind !== bucketUploadType.imageStack ||
          (bucketUpload.kind === bucketUploadType.imageStack &&
            bucketUpload.coverImage !== null)) &&
        (bucketUpload.kind !== bucketUploadType.pdf ||
          (bucketUpload.kind === bucketUploadType.pdf &&
            bucketUpload.uploadImage !== null))
      );
    });
  }

  function renderUploadFooter() {
    // Determine whether we should render the upload footer.
    if (!isAuthenticated) return null;

    const component = <UploadBucketFooter bucket={bucket} />;

    if (!bucket.allowUserCreate)
      return isProjectAdmin(accountState.user, project) && component;
    else return component;
  }

  return (
    <BucketBase dropzone>
      <BucketUploadContainer bucketUploads={getDisplayUploads()} />
      {renderUploadFooter()}
    </BucketBase>
  );
}

UploadsBucket.propTypes = {
  bucket: PropTypes.object,
};

export default UploadsBucket;
