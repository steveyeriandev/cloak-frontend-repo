import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import AsyncSelect from "react-select/async";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import LoadingButton from "components/buttons/Loading";
import BaseForm from "components/forms/Base";
import SelectFormControl from "components/forms/shared/SelectFormControl";
import FormGroup from "components/forms/shared/FormGroup";
import FormErrorText from "components/forms/shared/ErrorText";
import FormSubmitDivider from "components/forms/shared/SubmitDivider";
import { enrollmentStatus } from "utils/enums";
import { convertEnumToArray } from "utils/general";
import {
  updateEnrollment,
  createEnrollment,
  sendEnrollmentInvoice,
} from "features/enrollments/thunks";
import UserService from "features/users/service";
import { getErrorMessage } from "utils/general";
import InfoTooltip from "components/tooltips/Info";

function EnrollmentForm({ enrollment, closeModal, ...props }) {
  // Form to update an enrollment record.

  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const {
    handleSubmit,
    control,
    errors,
    setError,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      ...enrollment,
      registrationTier:
        enrollment.registrationTier && enrollment.registrationTier.id,
    },
  });
  const [search, setSearch] = useState("");
  const registrationTiers = useSelector((state) => state.projects.detail.tiers);
  const isUpdating = enrollment.id !== undefined;

  async function onSubmit(data) {
    /* Dispatch the create or update action for enrollment.

       If we send the `sendInvoice` then we'll create the enrollment record and then send a
       follow-up action to generate and send an invoice.
    */
    const dispatchAction = isUpdating ? updateEnrollment : createEnrollment;

    const { sendInvoice } = data;
    delete data.sendInvoice;
    let actionPayload = { payload: data };
    if (isUpdating) actionPayload.enrollmentId = enrollment.id;

    const action = await dispatch(dispatchAction(actionPayload));

    if (action.type.includes("fulfilled")) {
      let message = `Enrollment ${isUpdating ? "updated" : "created"}`;
      if (sendInvoice) {
        dispatch(sendEnrollmentInvoice({ enrollmentId: action.payload.id }));
        message += " and the invoice has been sent.";
      }

      addToast(message, { appearance: "success" });
      closeModal();
    } else if (action.type.includes("rejected")) {
      const message = getErrorMessage(
        action.payload.data,
        `Error ${isUpdating ? "updating" : "creating"} enrollment.`
      );
      setError("form", { message });
    }

    return action;
  }

  // Get the tier choices to use in a dropdown.
  const tierChoices = registrationTiers.map((registrationTier) => {
    return { value: registrationTier.id, label: registrationTier.title };
  });

  async function getOptions() {
    const userService = new UserService();
    const results = await userService.search(search);
    return results.data.length === 0
      ? []
      : results.data.map((user) => ({ value: user.id, label: user.username }));
  }

  function renderStudentSelect() {
    // Only allow selecting the student if adding a new enrollment.
    return enrollment.id !== undefined ? null : (
      <FormGroup label="Student (existing user)" errors={errors.student}>
        <Controller
          render={({ onChange, ref }) => (
            <AsyncSelect
              noOptionsMessage={() =>
                "User not found - enter full username/email"
              }
              onInputChange={(value) => setSearch(value)}
              onChange={(obj) => onChange(obj.value)}
              inputRef={ref}
              loadOptions={getOptions}
              placeholder="Enter email or handle"
            />
          )}
          control={control}
          name="student"
          defaultValue={enrollment.student || ""}
        />
        <FormErrorText text={errors.student && errors.student.message} />
      </FormGroup>
    );
  }

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)} {...props}>
      {renderStudentSelect()}
      <Form.Row>
        <Col sm={4}>
          <FormGroup label="Status" errors={errors.status}>
            <Controller
              as={
                <SelectFormControl
                  choices={convertEnumToArray(enrollmentStatus)}
                />
              }
              name="status"
              defaultValue={enrollment.status || enrollmentStatus.pending}
              control={control}
              isInvalid={errors.status !== undefined}
            />
          </FormGroup>
        </Col>
        <Col sm={8}>
          <FormGroup label="Tier" errors={errors.registrationTier}>
            <Controller
              as={<SelectFormControl choices={tierChoices} />}
              defaultValue={
                enrollment.registrationTier.id || tierChoices[0].value
              }
              rules={{ required: true }}
              name="registrationTier"
              control={control}
              isInvalid={errors.registrationTier !== undefined}
            />
          </FormGroup>
        </Col>
      </Form.Row>

      {!isUpdating && (
        <FormGroup errors={errors.sendInvoice}>
          <Controller
            render={(props) => (
              <Form.Check
                {...props}
                checked={props.value}
                onChange={(e) => props.onChange(e.target.checked)}
                isInvalid={errors.sendInvoice !== undefined}
                label={
                  <>
                    <span>Send invoice</span>
                    <InfoTooltip text="Send an invoice to the student's email. When the invoice is paid, the pending enrollment will become active." />
                  </>
                }
              />
            )}
            defaultvalue={false}
            name="sendInvoice"
            control={control}
          />
        </FormGroup>
      )}

      <FormSubmitDivider />
      <FormErrorText text={errors.form && errors.form.message} />
      <LoadingButton
        variant="primary"
        type="submit"
        isLoading={isSubmitting}
        block
      >
        Save
      </LoadingButton>
    </BaseForm>
  );
}

EnrollmentForm.propTypes = {
  // The enrollment object that we're updating.
  enrollment: PropTypes.object.isRequired,

  // Function to close the modal the form is in.
  closeModal: PropTypes.func.isRequired,
};

EnrollmentForm.defaultProps = {
  enrollment: {
    registrationTier: {},
  },
};

export default EnrollmentForm;
