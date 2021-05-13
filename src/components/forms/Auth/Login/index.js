import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import LoadingButton from "components/buttons/Loading";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";

import { loginUser } from "features/accounts/thunks";
import LineText from "components/general/LineText";
import BaseForm from "components/forms/Base";
import FormGroup from "components/forms/shared/FormGroup";
import ErrorText from "components/forms/shared/ErrorText";
import SocialAuthenticationContainer from "components/authentication/SocialAuthenticationContainer";
import FormSubmitDivider from "components/forms/shared/SubmitDivider";

function LoginForm({ closeModal }) {
  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [formErrorText, setFormErrorText] = useState();

  const onSubmit = async (data) => {
    setFormErrorText(null);
    const response = await dispatch(loginUser(data));

    if (response.type === "LOGIN_USER/fulfilled") {
      closeModal();
      addToast("Successfully logged in", {
        appearance: "success",
        autoDismiss: true,
      });
    } else if (response.type === "LOGIN_USER/rejected") {
      // Display the error message on the login form.
      try {
        setFormErrorText(response.payload.data.nonFieldErrors[0]);
      } catch {
        setFormErrorText("There was an error logging in.");
      }
    }

    return response;
  };

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)}>
      <SocialAuthenticationContainer closeModal={closeModal} />
      <LineText className="mb-3">OR</LineText>
      <FormGroup label="Email/Username" errors={errors.username}>
        <Controller
          as={Form.Control}
          rules={{ required: true }}
          name="username"
          control={control}
          defaultValue=""
          isInvalid={errors.username !== undefined}
        />
      </FormGroup>

      <FormGroup label="Password" errors={errors.password}>
        <Controller
          as={Form.Control}
          rules={{ required: true }}
          isInvalid={errors.password !== undefined}
          name="password"
          type="password"
          control={control}
          defaultValue=""
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

LoginForm.propTypes = {
  closeModal: PropTypes.func,
};

export default LoginForm;
