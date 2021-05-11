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

function ScheduleDescriptionForm({ project, closeModal, ...props }) {
  // Updates the schedule scheduleDescription for a project.

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
      <FormGroup
        label="Schedule Description"
        errors={errors.scheduleDescription}
      >
        <Controller
          as={Form.Control}
          control={control}
          name="scheduleDescription"
          isInvalid={errors.scheduleDescription !== undefined}
          defaultValue=""
          placeholder="Can choose a headline, such as class meeting schedule."
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

ScheduleDescriptionForm.propTypes = {
  project: PropTypes.object,
};

export default ScheduleDescriptionForm;
