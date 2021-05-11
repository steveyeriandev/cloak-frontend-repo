import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { navigate } from "@reach/router";

import LoadingButton from "components/buttons/Loading";
import BaseForm from "components/forms/Base";
import FormGroup from "components/forms/shared/FormGroup";
import FormSubmitDivider from "components/forms/shared/SubmitDivider";
import PrependControl from "components/forms/shared/PrependControl";
import { updateMe } from "features/accounts/thunks";
import { setFieldErrors } from "utils/forms";

function ProfileForm({ user, closeModal, ...props }) {
  // Form to update an user record.

  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const {
    handleSubmit,
    control,
    errors,
    setError,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: user,
  });

  async function onSubmit(payload) {
    // Dispatch action to update the user.
    try {
      const action = await dispatch(updateMe(payload));
      if (action.type === "UPDATE_ME/fulfilled") {
        addToast("Updated successfully", { appearance: "success" });
        closeModal();

        // If the user has changed their username we need to navigate to the new url.
        if (action.payload.username !== user.username)
          navigate(`/users/${action.payload.username}`);
      } else {
        setFieldErrors(action, setError);
      }

      return action;
    } catch (err) {
      addToast("Error updating user", { appearance: "error" });
    }
  }

  const socialFieldRules = {
    maxLength: {
      value: 64,
      message: "Maximum length of 64",
    },
  };

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)} {...props}>
      <Form.Row>
        <Col>
          <FormGroup label="First name" errors={errors.firstName}>
            <Controller
              as={Form.Control}
              rules={{
                required: true,
                maxLength: 128,
              }}
              name="firstName"
              defaultValue=""
              control={control}
              isInvalid={errors.firstName !== undefined}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup label="Last name" errors={errors.lastName}>
            <Controller
              as={Form.Control}
              rules={{
                maxLength: 128,
              }}
              name="lastName"
              defaultValue=""
              control={control}
              isInvalid={errors.lastName !== undefined}
            />
          </FormGroup>
        </Col>
      </Form.Row>

      <FormGroup label="Username" errors={errors.username}>
        <Controller
          as={Form.Control}
          rules={{
            maxLength: 128,
          }}
          name="username"
          defaultValue=""
          control={control}
          isInvalid={errors.username !== undefined}
        />
      </FormGroup>

      <FormGroup label="Biography" errors={errors.bio}>
        <Controller
          as={<Form.Control as="textarea" />}
          name="bio"
          rules={{ maxLength: 2000 }}
          defaultValue=""
          control={control}
          isInvalid={errors.bio !== undefined}
        />
      </FormGroup>
      <Form.Text className="text-muted text-center mb-2">
        For social connections, only enter your handle/username to ensure proper
        linking.
      </Form.Text>

      <Form.Row>
        <Col>
          <FormGroup label="Instagram" errors={errors.instagram}>
            <Controller
              render={(fieldProps, _) => (
                <PrependControl
                  errorField={errors.instagram}
                  prependText="@"
                  fieldProps={fieldProps}
                />
              )}
              name="instagram"
              defaultValue=""
              rules={socialFieldRules}
              control={control}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup label="Twitter" errors={errors.twitter}>
            <Controller
              render={(fieldProps, _) => (
                <PrependControl
                  errorField={errors.twitter}
                  prependText="@"
                  fieldProps={fieldProps}
                />
              )}
              name="twitter"
              defaultValue=""
              rules={socialFieldRules}
              control={control}
            />
          </FormGroup>
        </Col>
      </Form.Row>

      <Form.Row>
        <Col>
          <FormGroup label="Facebook" errors={errors.facebook}>
            <Controller
              render={(fieldProps, _) => (
                <PrependControl
                  errorField={errors.facebook}
                  prependText="facebook.com/"
                  fieldProps={fieldProps}
                />
              )}
              name="facebook"
              defaultValue=""
              rules={socialFieldRules}
              control={control}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup label="Linkedin" errors={errors.linkedin}>
            <Controller
              render={(fieldProps, _) => (
                <PrependControl
                  errorField={errors.linkedin}
                  prependText="linkedin.com/in/"
                  fieldProps={fieldProps}
                />
              )}
              name="linkedin"
              defaultValue=""
              rules={socialFieldRules}
              control={control}
            />
          </FormGroup>
        </Col>
      </Form.Row>

      <FormSubmitDivider />
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

ProfileForm.propTypes = {
  // The user object that we're updating.
  user: PropTypes.object.isRequired,

  // Function to close the modal the form is in.
  closeModal: PropTypes.func.isRequired,
};

export default ProfileForm;
