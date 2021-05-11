import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "@reach/router";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import ButtonContainer from "components/forms/shared/ButtonContainer";

import BaseForm from "../Base";
import FormGroup from "../shared/FormGroup";
import ErrorText from "../shared/ErrorText";
import LoadingButton from "components/buttons/Loading";
import { createProject } from "features/projects/thunks";
import { getProjectUrl } from "utils/projects";

function CreateProjectForm({ backAction, template, ...props }) {
  /* Provides a simple form for initial project creation. We want to keep this to be as minimal as
     possible, and have them edit mostly on the project info page.
  */
  const dispatch = useDispatch();
  const [formError, setFormError] = useState();
  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting },
  } = useForm();
  const user = useSelector((state) => state.account.user);

  async function onSubmit(data) {
    // When we create a project, there are some default values that need to be set.
    setFormError(null);
    data.template = template;
    data.teachers = [user.id];

    const action = await dispatch(createProject(data));
    if (action.type === "CREATE_PROJECT/fulfilled") {
      navigate(getProjectUrl(action.payload));
    } else setFormError("Error creating project");
  }

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormGroup label="What is your new project's name?" errors={errors.title}>
        <Controller
          as={Form.Control}
          name="title"
          rules={{ required: true }}
          control={control}
          isInvalid={errors.title !== undefined}
        />
      </FormGroup>

      <ErrorText text={formError} />
      <ButtonContainer className="justify-content-between">
        <Button variant="light" onClick={backAction}>
          <FontAwesomeIcon icon={faChevronLeft} /> Back
        </Button>
        <LoadingButton
          type="submit"
          isLoading={isSubmitting}
          className="float-right"
          width={100}
        >
          Next <FontAwesomeIcon icon={faChevronRight} />
        </LoadingButton>
      </ButtonContainer>
    </BaseForm>
  );
}

CreateProjectForm.propTypes = {
  // Action to take the user to the previous step in project creation.
  backAction: PropTypes.func.isRequired,

  // The template value, if there was one selected.
  template: PropTypes.number,
};

CreateProjectForm.defaultProps = {
  template: null,
};

export default CreateProjectForm;
