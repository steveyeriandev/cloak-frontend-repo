import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { useModal } from "react-modal-hook";

import ProjectSingleFieldForm from "components/forms/ProjectSingleField";
import FormModal from "components/modals/Form";
import EditProjectButton from "components/buttons/EditProject";
import TeacherSection from "../TeacherSection";
import EmptyActionSection from "components/general/EmptyActionSection";

function ClassInfoHeader({ project, shouldViewAdminItems }) {
  /* Displays a section of information for classes specifically. Only rendered for classes but not
     general projects. */

  const [showScheduleDescriptionModal, hideScheduleDescriptionModal] = useModal(
    () => {
      return (
        <FormModal onHide={hideScheduleDescriptionModal}>
          <ProjectSingleFieldForm
            project={project}
            closeModal={hideScheduleDescriptionModal}
            label="Schedule description"
            fieldName="scheduleDescription"
            controllerProps={{
              placeholder: "i.e. Meets every Monday from 4-5PM PST",
            }}
          />
        </FormModal>
      );
    }
  );
  const user = useSelector((state) => state.account.user);
  const isOwner = user && user.id === project.owner;

  function renderDateRange() {
    // Shows the dates that the class is active.
    return (
      <p className="mb-0">
        <Moment format="MMMM D">{project.startDate}</Moment> to&nbsp;
        <Moment format="MMMM D YYYY">{project.endDate}</Moment>
      </p>
    );
  }

  return (
    <div>
      {project.startDate && project.endDate && renderDateRange()}
      {project.scheduleDescription ? (
        <p className="mt-2 d-flex align-items-center">
          {project.scheduleDescription}
          {shouldViewAdminItems && (
            <EditProjectButton onClick={showScheduleDescriptionModal} />
          )}
        </p>
      ) : (
        shouldViewAdminItems && (
          <EmptyActionSection
            text="Your headline is currently empty."
            buttonAction={showScheduleDescriptionModal}
            buttonText="Create headline"
          />
        )
      )}
      <TeacherSection
        project={project}
        shouldViewAdminItems={isOwner && shouldViewAdminItems}
      />
    </div>
  );
}

ClassInfoHeader.propTypes = {
  // The project htat we're rendering the header for.
  project: PropTypes.object.isRequired,

  // Determines if the user should see the admin items for editing.
  shouldViewAdminItems: PropTypes.bool.isRequired,
};

export default ClassInfoHeader;
