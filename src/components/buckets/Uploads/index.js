import React from "react";
import PropTypes from "prop-types";
import BucketBase from "components/buckets/Base";
import { useSelector } from "react-redux";

import BucketUploadContainer from "components/buckets/Uploads/Container";
import LoadingContainer from "components/loading/Container";
import UploadBucketFooter from "components/navbars/UploadBucketFooter";
import { bucketUploadType } from "utils/enums";
import { isProjectAdmin } from "utils/projects";

function UploadsBucket({ bucket }) {
  // Displays the list of uploads for the bucket.

  const accountState = useSelector((state) => state.account);
  const isAuthenticated = accountState.token !== "";
  const project = useSelector((state) => state.projects.detail);

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
