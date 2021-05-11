import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useModal } from "react-modal-hook";
import { useSelector } from "react-redux";

import FormModal from "components/modals/Form";
import ContactProjectForm from "components/forms/ContactProject";
import { enrollmentStatus } from "utils/enums";
import ProjectActAsContext from "context/ProjectActAs";

function ProjectContactButton({ project, ...props }) {
  // Provides a button for the user to contact the project teachers.
  const [showContactModal, hideContactModal] = useModal(() => {
    return (
      <FormModal onHide={hideContactModal} title="Contact">
        <ContactProjectForm project={project} closeModal={hideContactModal} />
      </FormModal>
    );
  });

  // We need to check to see if the user has an active enrollment, which enables them to contact.
  const enrollments =
    useSelector((state) => state.account.user.enrollments) || [];
  const activeEnrollments = enrollments.filter((enrollment) => {
    return enrollment.status === enrollmentStatus.active;
  });
  const activeRegistrationTiers = activeEnrollments.map(
    (enrollment) => enrollment.registrationTier
  );
  const hasActiveRegistration = activeRegistrationTiers
    .map((registrationTier) => {
      return registrationTier.project.id;
    })
    .includes(project.id);

  return (
    <ProjectActAsContext>
      {({ registrationTier }) => {
        if (!hasActiveRegistration && !registrationTier) return null;

        return (
          <Button
            className="float-right"
            size="sm"
            variant="primary"
            onClick={showContactModal}
            {...props}
          >
            <FontAwesomeIcon icon={faEnvelope} /> Contact
          </Button>
        );
      }}
    </ProjectActAsContext>
  );
}

ProjectContactButton.propTypes = {
  // The project that the contact button will contact.
  project: PropTypes.object.isRequired,
};

export default ProjectContactButton;
