import React from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";

import BaseForm from "components/forms/Base";
import FormGroup from "components/forms/shared/FormGroup";
import LoadingButton from "components/buttons/Loading";
import ButtonContainer from "components/forms/shared/ButtonContainer";
import { updateProject } from "features/projects/thunks";

function ProjectSingleFieldForm({
  project,
  closeModal,
  label,
  fieldName,
  controllerProps,
  ...props
}) {
  // Provides a flexible form to update a single project field.

  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: project,
  });
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const onSubmit = async (data) => {
    const action = await dispatch(
      updateProject({ projectId: project.id, payload: data })
    );

    if (action.type === "UPDATE_PROJECT/fulfilled") {
      addToast("Project updated successfully", { appearance: "success" });
      closeModal();
    } else if (action.type === "UPDATE_PROJECT/rejected") {
      addToast("Error updating project", { appearance: "error" });
    }

    return action;
  };

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormGroup label={label} errors={errors[fieldName]}>
        <Controller
          as={Form.Control}
          control={control}
          name={fieldName}
          isInvalid={errors[fieldName] !== undefined}
          defaultValue=""
          {...controllerProps}
        />
      </FormGroup>
      <ButtonContainer>
        <LoadingButton variant="primary" type="submit" isLoading={isSubmitting}>
          Save
        </LoadingButton>
      </ButtonContainer>
    </BaseForm>
  );
}

ProjectSingleFieldForm.propTypes = {
  // The project for which we're editting a field
  project: PropTypes.object.isRequired,

  // The function to close the parent modal.
  closeModal: PropTypes.func.isRequired,

  // The label to show with the form field.
  label: PropTypes.string.isRequired,

  // The field name that will be updated.
  fieldName: PropTypes.string.isRequired,

  // Extra props to pass to the controller.
  controllerProps: PropTypes.object,
};

export default ProjectSingleFieldForm;
