import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { useToasts } from "react-toast-notifications";

import LoadingButton from "components/buttons/Loading";
import PostService from "features/posts/service";
import FormGroup from "../shared/FormGroup";
import ButtonContainer from "../shared/ButtonContainer";
import FormErrorText from "../shared/ErrorText";
import SubmitDivider from "../shared/SubmitDivider";
import BaseForm from "../Base";

function PostForm({ post, closeModal, ...props }) {
  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: post,
  });
  const [formError, setFormError] = useState(null);
  const { addToast } = useToasts();

  async function onSubmit(data) {
    setFormError(null);
    let payload = {
      ...post,
      ...data,
    };

    const postService = new PostService();
    try {
      await postService.create(payload);
      closeModal();
      addToast("Your upload has been shared!", { appearance: "success" });
    } catch (err) {
      setFormError(
        (err.response && err.response.data && err.response.data.detail) ||
          "Error creating post"
      );
    }
  }

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormGroup label="Text" errors={errors.text}>
        <Controller
          autoFocus
          as={Form.Control}
          name="text"
          placeholder="What are you sharing?"
          control={control}
          isInvalid={errors.text !== undefined}
          rules={{ required: true, maxLength: 1000 }}
        />
      </FormGroup>

      <SubmitDivider />
      <FormErrorText text={formError} />

      <ButtonContainer>
        <LoadingButton
          variant="primary"
          type="submit"
          isLoading={isSubmitting}
          width={150}
        >
          <FontAwesomeIcon icon={faShare} /> Share
        </LoadingButton>
      </ButtonContainer>
    </BaseForm>
  );
}

PostForm.propTyes = {
  // The post for which we'll be creating or updating.
  post: PropTypes.object.isRequired,

  // Action to close the modal after the post is created.
  closeModal: PropTypes.object.isRequired,
};

export default PostForm;
