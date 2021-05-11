import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useToasts } from "react-toast-notifications";
import { useModal } from "react-modal-hook";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import UserBlock from "components/projects/UserBlock";
import Loading from "components/loading/Loading";
import ConfirmActionModal from "components/modals/ConfirmAction";
import UserService from "features/users/service";
import { updateProject } from "features/projects/thunks";
import { getFullName, validateEmail } from "utils/users";

const TeacherBlockContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const NewTeacherInput = styled.div`
  width: 280px;
  margin-top: ${(props) => props.theme.spacingLg};
`;

const StyledLoading = styled(Loading)`
  border-width: 0.15em;
  margin-left: 2px;
  margin-right: 2px;
`;

function TeachersContainer({ project, canEdit, closeModal }) {
  const [teacherValue, setTeacherValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRemovingTeacher, setIsRemovingTeacher] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const teacherSearchRef = useRef(null);

  const [
    showRemoveTeacherConfirmationModal,
    hideRemoveTeacherConfirmationModal,
  ] = useModal(() => {
    async function handleRemoveTeacher() {
      // Handle sending the action to remove a teacher from the project.
      setIsRemovingTeacher(true);
      const teachers = project.teachers.filter(
        (teacher) => teacher.id !== selectedUser.id
      );
      await dispatch(
        updateProject({ projectId: project.id, payload: { teachers } })
      );
      addToast("Teacher removed", { appearance: "success" });
      setIsRemovingTeacher(false);
      hideRemoveTeacherConfirmationModal();
      closeModal();
    }

    return (
      <ConfirmActionModal
        title="Remove teacher"
        confirmAction={handleRemoveTeacher}
        isLoading={isRemovingTeacher}
        onHide={hideRemoveTeacherConfirmationModal}
        confirmText="Yes, remove"
      >
        <p>
          Are you sure you want to remove{" "}
          <b>{`${getFullName(selectedUser)}`}</b>? They will no longer receive
          payments, and you'll be taken to adjust the existing split.
        </p>
      </ConfirmActionModal>
    );
  }, [isRemovingTeacher, selectedUser]);

  async function addTeacher(teacher) {
    // Add a teacher to the project teacher list.
    let teachers = Object.assign([], project.teachers);
    teachers.push(teacher);
    await dispatch(
      updateProject({ projectId: project.id, payload: { teachers } })
    );
    setIsLoading(false);
    setTeacherValue("");
    closeModal();
  }

  async function handleTeacherSearch() {
    /* Performs a search for a teacher and adds the teacher to the project. Also spawns a follow-up
       modal so that the user can select the correct split for the teachers.
    */
    if (
      project.teachers.map((teacher) => teacher.email).includes(teacherValue)
    ) {
      return addToast("User is already a teacher", { appearance: "error" });
    } else if (teacherValue === "") {
      return addToast("Please enter an email", { appearance: "error" });
    }

    setIsLoading(true);
    const userService = new UserService();
    const response = await userService.search(teacherValue);
    if (!validateEmail(teacherValue)) {
      addToast("Invalid email", { appearance: "error" });
      setIsLoading(false);
    } else if (response.data.length === 0) {
      addToast("User not found", { appearance: "error" });
      setIsLoading(false);
    } else {
      setTeacherValue("");
      addTeacher(response.data[0]);
    }

    setIsLoading(false);
  }

  function handleKeyDown(e) {
    // Search for teacher if pressing enter.
    if (e.key === "Enter") teacherSearchRef.current.click();
  }

  function renderTeachers() {
    // Render the teacher block for each teacher.
    return project.teachers.map((teacher) => {
      function handleRemoveClick() {
        setSelectedUser(teacher);
        showRemoveTeacherConfirmationModal();
      }

      let userBlockProps = {
        key: teacher.id,
        user: teacher,
      };

      if (canEdit) userBlockProps.action = handleRemoveClick;

      return <UserBlock {...userBlockProps} />;
    });
  }

  return (
    <div>
      <TeacherBlockContainer>{renderTeachers()}</TeacherBlockContainer>
      {canEdit && (
        <NewTeacherInput>
          <InputGroup>
            <Form.Control
              placeholder="Enter email of new teacher"
              onChange={(e) => setTeacherValue(e.target.value)}
              onKeyDown={handleKeyDown}
              value={teacherValue}
            />
            <InputGroup.Append>
              <Button
                variant="primary"
                ref={teacherSearchRef}
                onClick={handleTeacherSearch}
              >
                {isLoading ? (
                  <StyledLoading size="sm" />
                ) : (
                  <FontAwesomeIcon icon={faPlus} />
                )}
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </NewTeacherInput>
      )}
    </div>
  );
}

TeachersContainer.propTypes = {
  // The project that we're editing the teachers of.
  project: PropTypes.object.isRequired,

  // Determine if the user should be able to modify the teachers
  canEdit: PropTypes.bool.isRequired,

  // Action to close the modal if the teachers section happens to be in one.
  closeModal: PropTypes.func,
};

TeachersContainer.defaultProps = {
  closeModal: () => {},
};

export default TeachersContainer;
