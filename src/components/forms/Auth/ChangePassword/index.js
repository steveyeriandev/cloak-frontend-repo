import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import LoadingButton from "components/buttons/Loading";
import { useToasts } from "react-toast-notifications";

import AccountService from "features/accounts/service";
import BaseForm from "components/forms/Base";
import FormSubmitDivider from "components/forms/shared/SubmitDivider";
import FormGroup from "components/forms/shared/FormGroup";
import useSetFieldErrors from "hooks/SetFieldErrors";

function ChangePasswordForm({ closeModal }) {
  // Provides a form for an authenticated user to change their password.

  const {
    handleSubmit,
    control,
    errors,
    getValues,
    setError,
    formState: { isSubmitting },
  } = useForm();
  const { addToast } = useToasts();
  const setFieldErrors = useSetFieldErrors(setError);

  const accountService = new AccountService();

  const onSubmit = async (data) => {
    try {
      await accountService.changePassword(data);
      addToast("Password changed successfully.", { appearance: "success" });
      closeModal();
    } catch (err) {
      setFieldErrors(err.response.data);
    }
  };

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="Old password" errors={errors.oldPassword}>
        <Controller
          as={Form.Control}
          isInvalid={errors.oldPassword !== undefined}
          name="oldPassword"
          type="password"
          control={control}
          defaultValue=""
        />
      </FormGroup>

      <FormGroup label="New password" errors={errors.newPassword1}>
        <Controller
          as={Form.Control}
          rules={{
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
            validate: {
              value: () =>
                getValues("newPassword1") === getValues("newPassword2") ||
                "Passwords do not match",
            },
          }}
          isInvalid={errors.newPassword1 !== undefined}
          name="newPassword1"
          type="password"
          control={control}
          defaultValue=""
        />
      </FormGroup>

      <FormGroup label="New password (repeat)" errors={errors.newPassword2}>
        <Controller
          as={Form.Control}
          isInvalid={errors.newPassword2 !== undefined}
          name="newPassword2"
          type="password"
          control={control}
          defaultValue=""
        />
      </FormGroup>

      <FormSubmitDivider />
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

ChangePasswordForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
