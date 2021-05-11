import React from "react";
import PropTypes from "prop-types";
import { useModal } from "react-modal-hook";

import SectionHeader from "components/general/SectionHeader";
import EmptyActionSection from "components/general/EmptyActionSection";
import ProjectContactButton from "components/projects/ContactButton";
import EditProjectButton from "components/buttons/EditProject";
import TeacherDisplay from "components/buckets/Info/TeacherDisplay";
import TeachersContainer from "components/projects/TeachersContainer";
import FormModal from "components/modals/Form";
import { projectTemplate } from "utils/enums";
import { getProjectType } from "utils/projects";

function TeacherDisplaySection({ shouldViewAdminItems, project }) {
  // Displays the teachers for a project, and allows the owner to edit.

  const [showTeachersModal, hideTeachersModal] = useModal(() => {
    return (
      <FormModal onHide={hideTeachersModal} title="Teachers">
        <TeachersContainer
          project={project}
          canEdit={shouldViewAdminItems}
          closeModal={hideTeachersModal}
        />
      </FormModal>
    );
  }, [project, shouldViewAdminItems]);

  function renderTeachers() {
    const teachers = project.teachers.map((teacher) => {
      return <TeacherDisplay teacher={teacher} key={teacher.id} />;
    });

    if (!shouldViewAdminItems) return teachers;

    // Allow the owner to edit the teachers.
    return (
      <>
        {teachers}
        <EditProjectButton
          onClick={showTeachersModal}
          className="d-none d-md-inline"
        />
      </>
    );
  }

  if (!project.teachers.length)
    return (
      <EmptyActionSection
        text="There are no teachers for this project."
        buttonAction={showTeachersModal}
        buttonText="Add teacher(s)"
      />
    );

  return (
    <div className="my-4">
      <SectionHeader>
        <span>
          {getProjectType(project) === projectTemplate.liveClass
            ? "Taught by"
            : "Collaborators"}
          &nbsp;
          <EditProjectButton
            onClick={showTeachersModal}
            className="d-md-none"
          />
        </span>
        <ProjectContactButton className="float-right" project={project} />
      </SectionHeader>
      {renderTeachers()}
    </div>
  );
}

TeacherDisplaySection.propTypes = {
  // The project for which we're displaying the teachers.
  project: PropTypes.object.isRequired,

  // Determines if the user is the owner of the project.
  shouldViewAdminItems: PropTypes.bool.isRequired,
};

export default TeacherDisplaySection;
