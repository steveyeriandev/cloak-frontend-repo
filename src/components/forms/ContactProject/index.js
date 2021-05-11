import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import ReactQuill from "react-quill";

import BaseForm from "components/forms/Base";
import FormGroup from "components/forms/shared/FormGroup";
import ButtonContainer from "components/forms/shared/ButtonContainer";
import ErrorText from "components/forms/shared/ErrorText";
import Select from "components/controls/Select";
import LoadingButton from "components/buttons/Loading";
import ProjectService from "features/projects/service";
import { getFullName } from "utils/users";

import "react-quill/dist/quill.snow.css";

function ProjectContactForm({ project, closeModal }) {
  // Provides a form for sending a contact email to a project.
  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(data) {
    setErrorMessage("");
    const service = new ProjectService();
    data.users = data.users.map((obj) => obj.value);

    try {
      const response = await service.sendContactEmail(project.id, data);
      closeModal();
      return response;
    } catch (err) {
      const message =
        err.response.data && err.response.data.detail
          ? err.response.data.detail
          : "Error sending contact email.";
      setErrorMessage(message);
    }
  }

  const teacherOptions = project.teachers.map((teacher) => ({
    value: teacher.id,
    label: getFullName(teacher),
  }));

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="To" errors={errors.users}>
        <Controller
          as={Select}
          options={teacherOptions}
          isMulti
          name="users"
          control={control}
          rules={{
            required: true,
            minLength: 1,
          }}
          defaultValue={teacherOptions}
          isInvalid={errors.users !== undefined}
          isDisabled={project.teachers.length === 1}
        />
      </FormGroup>
      <FormGroup label="Subject" errors={errors.subject}>
        <Controller
          as={Form.Control}
          isInvalid={errors.subject !== undefined}
          rules={{ required: true, maxLength: 200 }}
          name="subject"
          control={control}
          defaultValue=""
        />
      </FormGroup>
      <FormGroup label="Email body" errors={errors.body} isCustomControl>
        <Controller
          as={ReactQuill}
          isInvalid={errors.body !== undefined}
          rules={{ required: true, maxLength: 10000 }}
          name="body"
          control={control}
          defaultValue=""
        />
      </FormGroup>
      <ErrorText text={errorMessage} />
      <ButtonContainer>
        <LoadingButton type="submit" isLoading={isSubmitting}>
          Send
        </LoadingButton>
      </ButtonContainer>
    </BaseForm>
  );
}

ProjectContactForm.propTypes = {
  // The project that we'll be contacting.
  project: PropTypes.object.isRequired,

  closeModal: PropTypes.func.isRequired,
};

export default ProjectContactForm;
