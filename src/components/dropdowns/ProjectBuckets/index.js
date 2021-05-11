import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { navigate, useLocation } from "@reach/router";
import { useModal } from "react-modal-hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import FormModal from "components/modals/Form";
import BucketForm from "components/forms/Bucket";
import BucketNavigationDropdown from "components/buttons/BucketNavigationDropdown";
import InfoTooltip from "components/tooltips/Info";
import {
  getProjectBaseUrl,
  getProjectDescriptor,
  getProjectUrl,
  isProjectAdmin,
} from "utils/projects";
import { setCurrentBucket } from "features/buckets/slice";

function ProjectBucketDropdown({
  project,
  currentBucket,
  user,
  actAsPublic,
  actAsRegistrationTier,
}) {
  // Provides the dropdown for selecting a bucket within a given project.

  const dispatch = useDispatch();
  const location = useLocation();

  const projectBaseUrl = getProjectBaseUrl(project);
  const projectInfoLocation = getProjectUrl(project);
  const projectInfoActive = location.pathname === projectInfoLocation;
  const projectDescriptor = getProjectDescriptor(project);

  const [showCreateBucketModal, hideCreateBucketModal] = useModal(() => {
    // Handles the bucket modal for creating a new bucket..
    return (
      <FormModal
        title={
          <span>
            Create Bucket
            <InfoTooltip text="Buckets are the tabs in your project that group content together." />
          </span>
        }
        onHide={hideCreateBucketModal}
      >
        <BucketForm
          bucket={{
            project: project.id,
            registrationTiers: [],
            isPublic: true,
          }}
          closeModal={hideCreateBucketModal}
          showAllFields
          navigateAfterCreate
        />
      </FormModal>
    );
  });

  const getViewableBuckets = () => {
    /* Returns an array of the buckets that should be shown to the user.

       This could be very simple, however we also have a way for a project admin to act as a public
       user or a given registration tier, which is why we need to have a filter for it here.
    */
    if (!actAsPublic && !actAsRegistrationTier) return project.buckets;
    else if (actAsPublic)
      return project.buckets.filter((bucket) => bucket.isPublic);
    else if (actAsRegistrationTier)
      return project.buckets.filter((bucket) => {
        return (
          bucket.registrationTiers.includes(actAsRegistrationTier) ||
          bucket.isPublic
        );
      });
  };

  return (
    <BucketNavigationDropdown
      title={currentBucket.title || `${projectDescriptor} info`}
    >
      <Dropdown.Item
        active={projectInfoActive}
        onClick={() => {
          dispatch(setCurrentBucket({}));
          navigate(projectInfoLocation);
        }}
      >
        {`${projectDescriptor} info`}
      </Dropdown.Item>

      {getViewableBuckets().map((bucket) => {
        const url = `${projectBaseUrl}/${bucket.slug}`;
        const isActive = location.pathname === url;
        return (
          <Dropdown.Item
            key={bucket.id}
            active={isActive}
            onClick={() => {
              dispatch(setCurrentBucket(bucket));
              navigate(url);
            }}
          >
            {bucket.title}
          </Dropdown.Item>
        );
      })}

      {isProjectAdmin(user, project) && (
        <Dropdown.Item
          className="bg-secondary rounded-bottom"
          onClick={showCreateBucketModal}
        >
          <FontAwesomeIcon icon={faPlusCircle} /> Create bucket
        </Dropdown.Item>
      )}
    </BucketNavigationDropdown>
  );
}

ProjectBucketDropdown.propTypes = {
  // The project for which we're rendering the buckets.
  project: PropTypes.object.isRequired,

  // The current bucket that we're looking at.
  currentBucket: PropTypes.object,
};

export default ProjectBucketDropdown;
