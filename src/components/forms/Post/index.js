import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faSave } from "@fortawesome/free-solid-svg-icons";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";

import LoadingButton from "components/buttons/Loading";
import ModalBackButton from "components/modals/BackButton";
import PostService from "features/posts/service";
import { updatePost } from "features/posts/thunks";
import FormGroup from "../shared/FormGroup";
import ButtonContainer from "../shared/ButtonContainer";
import FormErrorText from "../shared/ErrorText";
import SubmitDivider from "../shared/SubmitDivider";
import BaseForm from "../Base";

function PostForm({ post, closeModal, backAction, ...props }) {
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
  const dispatch = useDispatch();

  const isUpdating = post && post.id;

  async function onSubmit(data) {
    setFormError(null);
    let payload = {
      ...post,
      ...data,
    };

    const postService = new PostService();
    const apiCall = isUpdating
      ? dispatch(updatePost({ postId: post.id, payload }))
      : postService.create(payload);
    const verb = isUpdating ? "updating" : "creating";
    const successMessage = isUpdating
      ? "Your post has been updated!"
      : "Your upload has been shared!";

    try {
      await apiCall;
      closeModal();
      addToast(successMessage, { appearance: "success" });
    } catch (err) {
      setFormError(
        (err.response && err.response.data && err.response.data.detail) ||
          `Error ${verb} post`
      );
    }
  }

  function renderButtonText() {
    // Different text based on if we're creating or saving.
    return isUpdating ? (
      <span>
        <FontAwesomeIcon icon={faSave} /> Save
      </span>
    ) : (
      <span>
        <FontAwesomeIcon icon={faShare} /> Share
      </span>
    );
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

      <ButtonContainer className="justify-content-between">
        {backAction && <ModalBackButton onClick={backAction} />}
        <LoadingButton
          variant="primary"
          type="submit"
          isLoading={isSubmitting}
          width={150}
        >
          {renderButtonText()}
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
