import React from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import LoadingButton from "components/buttons/Loading";
import { useToasts } from "react-toast-notifications";

import { axiosInstance } from "features/api";
import { resetPasswordUrl } from "features/accounts/api";
import BaseForm from "components/forms/Base";
import FormGroup from "components/forms/shared/FormGroup";
import { navigate } from "@reach/router";
import FormSubmitDivider from "components/forms/shared/SubmitDivider";

function ResetPasswordForm({ uid, token }) {
  const {
    handleSubmit,
    control,
    errors,
    getValues,
    formState: { isSubmitting },
  } = useForm();
  const { addToast } = useToasts();

  const onSubmit = async (data) => {
    data.uid = uid;
    data.token = token;

    try {
      const response = await axiosInstance.post(resetPasswordUrl, data);
      addToast("Your password has been reset, you may now login.", {
        appearance: "success",
        autoDismiss: true,
      });
      navigate("/");
      return response;
    } catch (e) {}
  };

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="Password" errors={errors.newPassword1}>
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

      <FormGroup label="Password (repeat)" errors={errors.newPassword2}>
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

ResetPasswordForm.propTypes = {
  /* A secret value that determines the user. */
  uid: PropTypes.string,

  /* A secret token to hash the password request. */
  token: PropTypes.string,
};

export default ResetPasswordForm;
