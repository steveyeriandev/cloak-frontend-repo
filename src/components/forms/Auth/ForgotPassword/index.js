import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import LoadingButton from "components/buttons/Loading";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";

import FormSubmitDivider from "components/forms/shared/SubmitDivider";
import FormGroup from "components/forms/shared/FormGroup";
import BaseForm from "components/forms/Base";
import ErrorText from "components/forms/shared/ErrorText";
import { forgotPassword } from "features/accounts/thunks";

function ForgotPasswordForm({ closeModal }) {
  const [formErrorText, setFormErrorText] = useState();
  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const onSubmit = async (data) => {
    const response = await dispatch(forgotPassword(data));
    if (response.type === "FORGOT_PASSWORD/fulfilled") {
      closeModal();
      addToast("Reset email has been sent.", {
        appearance: "success",
        autoDismiss: true,
      });
    } else if (response.type === "FORGOT_PASSWORD/rejected") {
      // Display the error message on the login form.
      try {
        setFormErrorText(response.payload.data.nonFieldErrors[0]);
      } catch {
        setFormErrorText("Could not reset account email.");
      }
    }

    return response;
  };

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="Email" errors={errors.email}>
        <Controller
          as={Form.Control}
          rules={{
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          name="email"
          control={control}
          defaultValue=""
          isInvalid={errors.email !== undefined}
        />
      </FormGroup>
      <FormSubmitDivider />
      <ErrorText text={formErrorText} />
      <LoadingButton
        variant="primary"
        type="submit"
        isLoading={isSubmitting}
        block
      >
        Submit
      </LoadingButton>
    </BaseForm>
  );
}

ForgotPasswordForm.propTypes = {
  closeModal: PropTypes.func,
};

export default ForgotPasswordForm;
