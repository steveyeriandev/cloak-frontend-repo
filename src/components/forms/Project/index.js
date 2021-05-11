import React from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";
import ReactQuill from "react-quill";
import SelectFormControl from "components/forms/shared/SelectFormControl";
import "react-quill/dist/quill.snow.css";

import BaseForm from "components/forms/Base";
import FormGroup from "components/forms/shared/FormGroup";
import ManageFormTitle from "components/general/ActionHeader";
import EditMediaBlockContainer from "components/projects/EditMediaBlockContainer";
import TeachersContainer from "components/projects/TeachersContainer";
import InfoTooltip from "components/tooltips/Info";
import ImageUploader from "components/images/ImageUploader";
import { updateProject, updateProjectImage } from "features/projects/thunks";
import { getProjectDescriptor } from "utils/projects";

const ProjectImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    &:hover {
      cursor: pointer;
    }
  }
`;

function ProjectForm({ project, ...props }) {
  // Form for editing an entire project.
  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: project,
  });
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const user = useSelector((state) => state.account.user);

  const onSubmit = async (data) => {
    const action = await dispatch(
      updateProject({
        projectId: project.id,
        payload: data,
      })
    );

    if (action.type === "UPDATE_PROJECT/fulfilled") {
      addToast("Project updated successfully", { appearance: "success" });
    } else if (action.type === "UPDATE_PROJECT/rejected") {
      addToast("Error updating project", { appearance: "error" });
    }

    return action;
  };

  const projectDescriptor = getProjectDescriptor(project);
  const isPublicChoices = [
    { value: true, label: "Public" },
    { value: false, label: "Private" },
  ];

  return (
    <BaseForm {...props}>
      <ManageFormTitle isLoading={isSubmitting} action={handleSubmit(onSubmit)}>
        {projectDescriptor} Info
        <InfoTooltip text="Updates the main data for your class" />
      </ManageFormTitle>
      <Form.Row>
        <Col sm={4}>
          <ProjectImageContainer className="pr-4">
            <ImageUploader
              action={updateProjectImage}
              actionPayload={{ projectId: project.id }}
              imageSrc={project.image}
            />
          </ProjectImageContainer>
          <FormGroup label="" errors={errors.hidePosterImage}>
            <Controller
              render={({ onChange, value, ref }, _) => {
                return (
                  <Form.Check
                    type="switch"
                    onChange={(e) => onChange(e.target.checked)}
                    id="project-hide-poster-image"
                    checked={value}
                    inputRef={ref}
                    defaultValue={project ? project.hidePosterImage : false}
                    label="Hide poster image on info page"
                  />
                );
              }}
              defaultValue={true}
              name="hidePosterImage"
              control={control}
            />
          </FormGroup>
        </Col>

        <Col sm={8}>
          <FormGroup label="Title" errors={errors.title}>
            <Controller
              as={Form.Control}
              rules={{ required: true }}
              name="title"
              control={control}
              defaultValue=""
              isInvalid={errors.title !== undefined}
            />
          </FormGroup>

          <FormGroup label="Private / Public" errors={errors.isPublic}>
            <Controller
              as={SelectFormControl}
              choices={isPublicChoices}
              defaultValue={project.isPublic || false}
              name="isPublic"
              control={control}
            />
          </FormGroup>

          <FormGroup label="Description" errors={errors.description}>
            <Controller
              as={ReactQuill}
              isInvalid={errors.description !== undefined}
              name="description"
              control={control}
              defaultValue=""
            />
          </FormGroup>

          <FormGroup
            label="Schedule Description"
            errors={errors.scheduleDescription}
          >
            <Controller
              as={Form.Control}
              name="scheduleDescription"
              control={control}
              defaultValue=""
              isInvalid={errors.scheduleDescription !== undefined}
            />
          </FormGroup>
        </Col>
      </Form.Row>

      <Form.Row className="mt-4">
        <Col>
          <FormGroup label="Teachers">
            <TeachersContainer
              project={project}
              canEdit={user.id === project.owner}
            />
          </FormGroup>
        </Col>
      </Form.Row>

      <Form.Row className="mt-4">
        <Col>
          <FormGroup
            label="Images"
            tooltip={
              <InfoTooltip
                id="project-class-images"
                text={`Images that appear on your ${projectDescriptor} info page under description.`}
              />
            }
          >
            <EditMediaBlockContainer mediaBlock={project.imageBlocks[0]} />
          </FormGroup>
        </Col>
      </Form.Row>
    </BaseForm>
  );
}

ProjectForm.propTypes = {
  // The project for which we're rendering the form.
  project: PropTypes.object,
};

export default ProjectForm;
