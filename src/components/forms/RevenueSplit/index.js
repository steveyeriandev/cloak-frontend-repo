import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import LoadingButton from "components/buttons/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

import FormGroup from "components/forms/shared/FormGroup";
import SubmitButtonContainer from "components/forms/shared/ButtonContainer";
import ErrorText from "components/forms/shared/ErrorText";
import BaseForm from "components/forms/Base";
import SelectFormControl from "components/forms/shared/SelectFormControl";
import ModalBackButton from "components/modals/BackButton";
import {
  createRevenueSplit,
  updateRevenueSplit,
} from "features/revenueSplits/thunks";
import { getFullName } from "utils/users";

function RevenueSplitForm({
  revenueSplit,
  successAction,
  backAction,
  ...props
}) {
  // Form for updating or creating a revenue split.

  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: revenueSplit,
  });
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const project = useSelector((state) => state.projects.detail);
  const [formError, setFormError] = useState();

  const isUpdating = "id" in revenueSplit;

  async function onSubmit(data) {
    // Send action to update or create the revenue split.
    setFormError(null);

    // Registration tier is not directly selected in the form.
    data.registrationTier = revenueSplit.registrationTier.id;

    const action = isUpdating
      ? await dispatch(
          updateRevenueSplit({
            registrationTierId: revenueSplit.registrationTier.id,
            revenueSplitId: revenueSplit.id,
            payload: data,
          })
        )
      : await dispatch(
          createRevenueSplit({
            registrationTierId: revenueSplit.registrationTier.id,
            payload: data,
          })
        );

    if (action.type === "UPDATE_REVENUE_SPLIT/fulfilled") {
      addToast("Split percent updated successfully", { appearance: "success" });
      successAction();
    } else if (action.type === "CREATE_REVENUE_SPLIT/fulfilled") {
      addToast("Split created successfully", { appearance: "success" });
      successAction();
    } else {
      let errorMessage = `Error ${
        isUpdating ? "updating" : "creating"
      } revenue split.`;

      // Update the error message if we have something more descriptive.
      if (action.payload && action.payload.data) {
        const { detail, nonFieldErrors } = action.payload.data;
        if (detail) errorMessage = detail;
        if (nonFieldErrors) errorMessage = nonFieldErrors;
      }
      setFormError(errorMessage);
    }

    return action;
  }

  const teacherChoices = project.teachers.map((teacher) => ({
    label: getFullName(teacher),
    value: teacher.id,
  }));

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormGroup label="Percent split" errors={errors.splitPercent}>
        <Controller
          as={<Form.Control type="number" min="0" max="100" step="1" />}
          rules={{ required: true }}
          name="splitPercent"
          control={control}
          defaultValue=""
          isInvalid={errors.splitPercent !== undefined}
        />
      </FormGroup>
      {!isUpdating && (
        <FormGroup label="User">
          <Controller
            as={<SelectFormControl />}
            choices={teacherChoices}
            defaultValue={revenueSplit.user || teacherChoices[0].value}
            name="user"
            control={control}
          />
        </FormGroup>
      )}
      <ErrorText text={formError} />
      <SubmitButtonContainer className="justify-content-between">
        {backAction && <ModalBackButton onClick={backAction} />}
        <LoadingButton isLoading={isSubmitting} type="submit" width={100}>
          <FontAwesomeIcon icon={faSave} /> {isUpdating ? "Save" : "Create"}
        </LoadingButton>
      </SubmitButtonContainer>
    </BaseForm>
  );
}

RevenueSplitForm.propTypes = {
  // The revenue split instance that we're updating.
  revenueSplit: PropTypes.object.isRequired,

  // Action to take after the revenue split is created/updated.
  successAction: PropTypes.func.isRequired,

  // Action to return to the previous section of the modal.
  backAction: PropTypes.func.isRequired,
};

export default RevenueSplitForm;
