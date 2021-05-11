import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import LoadingButton from "components/buttons/Loading";
import BaseForm from "components/forms/Base";
import FormGroup from "components/forms/shared/FormGroup";
import FormErrorText from "components/forms/shared/ErrorText";
import {
  updateFeedMessage,
  createFeedMessage,
} from "features/feedMessages/thunks";
import { getErrorMessage } from "utils/general";
import FormButtonContainer from "../shared/ButtonContainer";

function FeedMessageForm({
  feedMessage,
  toggleConfirmDelete,
  closeModal,
  ...props
}) {
  // Form to create a feed message in a feed bucket.

  const dispatch = useDispatch();
  const currentBucketId = useSelector((state) => state.buckets.current.id);
  const { addToast } = useToasts();
  const {
    handleSubmit,
    control,
    errors,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      message: feedMessage ? feedMessage.message : "",
    },
  });
  const [formError, setFormError] = useState();

  const isUpdating = feedMessage !== undefined && "id" in feedMessage;

  async function onSubmit(payload) {
    // Dispatch the action to either create or update a feed message object.

    payload.bucket = currentBucketId;
    const reduxAction = isUpdating
      ? updateFeedMessage({ feedMessageId: feedMessage.id, payload })
      : createFeedMessage({ payload });

    const action = await dispatch(reduxAction);
    if (action.type.includes("fulfilled")) {
      addToast(`Message ${isUpdating ? "updated" : "created"}`, {
        appearance: "success",
      });
      reset();
      closeModal();
    } else if (action.type.includes("rejected")) {
      const message = getErrorMessage(
        action.payload.data,
        `Error ${isUpdating ? "updating" : "creating"} feed message`
      );
      setFormError(message);
    }

    return action;
  }

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormGroup label="Message" errors={errors.message}>
        <Controller
          as={<Form.Control as="textarea" />}
          rows="8"
          defaultValue=""
          rules={{
            required: true,
            maxLength: 1000,
          }}
          name="message"
          control={control}
          isInvalid={errors.message !== undefined}
        />
      </FormGroup>

      <FormErrorText text={formError} />
      <FormButtonContainer className="justify-content-between">
        {feedMessage && (
          <Button variant="outline-danger" onClick={toggleConfirmDelete}>
            Delete <FontAwesomeIcon icon={faTrash} />
          </Button>
        )}
        <LoadingButton variant="primary" type="submit" isLoading={isSubmitting}>
          Save
        </LoadingButton>
      </FormButtonContainer>
    </BaseForm>
  );
}

FeedMessageForm.propTypes = {
  // The feed message object we'll submit, which will come in with some pre-populated fields.
  feedMessage: PropTypes.object,

  // Function to close the modal, if the form is in modal.
  closeModal: PropTypes.func,

  // Toggles the modal into confirm delete mode.
  toggleConfirmDelete: PropTypes.func,
};

FeedMessageForm.defaultProps = {
  closeModal: () => {},
};

export default FeedMessageForm;
