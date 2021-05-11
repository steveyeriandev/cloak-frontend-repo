import React from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";

import BaseForm from "components/forms/Base";
import ErrorText from "components/forms/shared/ErrorText";
import FormGroup from "components/forms/shared/FormGroup";
import LoadingButton from "components/buttons/Loading";
import SocialAuthenticationContainer from "components/authentication/SocialAuthenticationContainer";
import { registerUser } from "features/accounts/thunks";
import FormSubmitDivider from "components/forms/shared/SubmitDivider";
import { useToasts } from "react-toast-notifications";

function RegistrationForm({ closeModal }) {
  const {
    handleSubmit,
    control,
    setError,
    errors,
    getValues,
    formState: { isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const onSubmit = async (data) => {
    const response = await dispatch(registerUser(data));

    if (response.type === "REGISTER_USER/rejected") {
      for (let fieldKey in response.payload.data) {
        setError(fieldKey, {
          type: "manual",
          message: response.payload.data[fieldKey],
        });
      }
    }

    if (response.type === "REGISTER_USER/fulfilled") {
      addToast("Email sent, please verify your account.", {
        appearance: "success",
      });
      closeModal();
    }

    return response;
  };

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)}>
      <SocialAuthenticationContainer closeModal={closeModal} />
      <hr />
      <Form.Row>
        <Col>
          <FormGroup label="First name" errors={errors.firstName}>
            <Controller
              as={Form.Control}
              rules={{ required: true }}
              name="firstName"
              control={control}
              defaultValue=""
              isInvalid={errors.firstName !== undefined}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup label="Last name" errors={errors.lastName}>
            <Controller
              as={Form.Control}
              rules={{ required: true }}
              name="lastName"
              control={control}
              defaultValue=""
              isInvalid={errors.lastName !== undefined}
            />
          </FormGroup>
        </Col>
      </Form.Row>

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

      <FormGroup label="Username" errors={errors.username}>
        <Controller
          as={Form.Control}
          rules={{ required: true }}
          name="username"
          control={control}
          defaultValue=""
          isInvalid={errors.username !== undefined}
        />
      </FormGroup>

      <FormGroup label="Password" errors={errors.password1}>
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
                getValues("password1") === getValues("password2") ||
                "Passwords do not match",
            },
          }}
          isInvalid={errors.password1 !== undefined}
          name="password1"
          type="password"
          control={control}
          defaultValue=""
        />
      </FormGroup>

      <FormGroup label="Password (repeat)" errors={errors.password2}>
        <Controller
          as={Form.Control}
          isInvalid={errors.password2 !== undefined}
          name="password2"
          type="password"
          control={control}
          defaultValue=""
        />
      </FormGroup>

      <FormGroup errors={errors.agreement}>
        <Controller
          render={(props) => (
            <Form.Check
              {...props}
              checked={props.value}
              onChange={(e) => props.onChange(e.target.checked)}
              isInvalid={errors.agreement !== undefined}
              type="checkbox"
              label={
                <span>
                  I agree with the{" "}
                  <a href="/terms-of-use" target="_blank" rel="noreferrer">
                    Terms of Use
                  </a>
                </span>
              }
            />
          )}
          name="agreement"
          rules={{
            required: true,
            message: "You must agree to the terms",
          }}
          control={control}
          defaultValue={false}
        />
      </FormGroup>

      <FormSubmitDivider />
      <ErrorText text={errors.form && errors.form.message} />
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

RegistrationForm.propTypes = {
  closeModal: PropTypes.func,
};

export default RegistrationForm;
