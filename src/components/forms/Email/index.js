import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import { useForm, Controller } from "react-hook-form";
import { useToasts } from "react-toast-notifications";

import { axiosInstance } from "features/api";
import LoadingButton from "components/buttons/Loading";
import BaseForm from "components/forms/Base";
import FormGroup from "components/forms/shared/FormGroup";
import FormErrorText from "components/forms/shared/ErrorText";
import FormSubmitDivider from "components/forms/shared/SubmitDivider";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EmailForm({ email, toDisabled, isBcc, apiUrl, closeModal, ...props }) {
  // Generic form to send an email.

  const { addToast } = useToasts();
  const {
    handleSubmit,
    control,
    errors,
    setError,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: email,
  });

  async function onSubmit(payload) {
    // Send the data to the server to send the email.
    try {
      await axiosInstance.post(apiUrl, payload);
      addToast("Email sent", { appearance: "success" });
      closeModal();
    } catch (e) {
      setError("form", { message: "Error sending email" });
    }
  }

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)} {...props}>
      {!isBcc && (
        <FormGroup label="To" errors={errors.to}>
          <Controller
            as={Form.Control}
            disabled={toDisabled}
            name="to"
            defaultValue={email.to || []}
            control={control}
            isInvalid={errors.to !== undefined}
          />
        </FormGroup>
      )}

      {isBcc && (
        <FormGroup label="Bcc" errors={errors.bcc}>
          <Controller
            as={Form.Control}
            disabled={toDisabled}
            name="bcc"
            defaultValue={email.bcc || []}
            control={control}
            isInvalid={errors.bcc !== undefined}
          />
        </FormGroup>
      )}

      <FormGroup label="Subject" errors={errors.subject}>
        <Controller
          as={Form.Control}
          rules={{ required: true }}
          name="subject"
          defaultValue={email.subject || ""}
          control={control}
          isInvalid={errors.subject !== undefined}
        />
      </FormGroup>

      <FormGroup label="Message" errors={errors.emailBody}>
        <Controller
          as={ReactQuill}
          rules={{ required: true }}
          name="emailBody"
          defaultValue={email.emailBody}
          control={control}
          isInvalid={errors.emailBody !== undefined}
        />
      </FormGroup>

      <FormSubmitDivider />

      <FormErrorText text={errors.form && errors.form.message} />
      <LoadingButton
        variant="primary"
        type="submit"
        isLoading={isSubmitting}
        block
      >
        Send
      </LoadingButton>
    </BaseForm>
  );
}

EmailForm.propTypes = {
  // Email data that is passed in to begin the form.
  email: PropTypes.object,

  // Function to close the modal the form is in.
  closeModal: PropTypes.func.isRequired,

  // The url that we'll send the email data to - by passing in the url like this we maintain the
  // form to be generic sending emails.
  apiUrl: PropTypes.string.isRequired,

  // Choose whether or not the to field should be disabled
  toDisabled: PropTypes.bool,

  // Determines if the email recipients should be on the bcc list
  isBcc: PropTypes.bool,
};

EmailForm.defaultProps = {
  toDisabled: false,
  isBcc: false,
  email: {},
};

export default EmailForm;
