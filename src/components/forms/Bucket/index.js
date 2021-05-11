import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { navigate } from "@reach/router";
import styled from "styled-components";

import LoadingButton from "components/buttons/Loading";
import BaseForm from "components/forms/Base";
import SelectFormControl from "components/forms/shared/SelectFormControl";
import FormGroup from "components/forms/shared/FormGroup";
import ButtonContainer from "components/forms/shared/ButtonContainer";
import Select from "components/controls/Select";
import InfoTooltip from "components/tooltips/Info";
import ModalBackButton from "components/modals/BackButton";
import useRegistrationTierChoices from "hooks/RegistrationTierChoices";
import useSetFieldErrors from "hooks/SetFieldErrors";
import { createBucket, updateBucket } from "features/buckets/thunks";
import { bucketType } from "utils/enums";
import { convertEnumToArray } from "utils/general";
import { getProjectBaseUrl } from "utils/projects";
import FormSubmitDivider from "../shared/SubmitDivider";
import ErrorText from "../shared/ErrorText";

const StyledButtonContainer = styled(ButtonContainer)`
  ${({ hasMultiple }) =>
    hasMultiple &&
    `
    justify-content: space-between;
  `}
`;

function BucketForm({
  bucket,
  backAction,
  closeModal,
  showAllFields,
  navigateAfterCreate,
  ...props
}) {
  /* Form to create or update a bucket.

     When creating a new bucket, some of the initial values will be passed in through the "bucket"
     prop, and then the user will fill in the other data which isn't derived before opening the
     form. Attributes such as public or registration tiers are typically "chosen" indirectly before
     opening up the form.
  */
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.detail);
  const { addToast } = useToasts();
  const {
    handleSubmit,
    control,
    errors,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: bucket,
  });
  const tierChoices = useRegistrationTierChoices();
  const setFieldErrors = useSetFieldErrors();
  const [formError, setFormError] = useState();

  const watchIsPublic = watch("isPublic", true);

  const isUpdating = "id" in bucket;

  async function onSubmit(data) {
    /* Here we'll submit the bucket data for creation/updating.

       There is a bit of non-standard-ness here as the "bucket" data passed in when creating isn't
       actually on the form. The registration tiers and isPublic are passed in from previous
       decisions, rather than deciding that here on the bucket form.
    */
    setFormError(null);
    data.project = project.id;

    // When a bucket is saved as public, it can't be limited to tier.
    if (data.isPublic) data.registrationTiers = [];

    const payload = {
      ...bucket,
      ...data,
    };
    let actionPayload = { payload };
    if (isUpdating) actionPayload.bucketId = bucket.id;

    const _action = isUpdating ? updateBucket : createBucket;
    const action = await dispatch(_action(actionPayload));
    if (action.type.includes("rejected")) {
      setFormError(`Error ${isUpdating ? "updating" : "creating"} bucket.`);
      setFieldErrors();
    } else if (action.type.includes("fulfilled")) {
      addToast(`Bucket ${isUpdating ? "updated" : "created"}`, {
        appearance: "success",
      });
      const url = `${getProjectBaseUrl(project)}/${action.payload.slug}`;
      if (navigateAfterCreate) navigate(url);
      closeModal();
    }

    return action;
  }

  function renderTypeField() {
    // A bucket's type should not be changed after creation due to the connected data.
    if (isUpdating) return null;

    return (
      <FormGroup
        label="Type"
        errors={errors.kind}
        tooltipText="Upload bucket allows uploads of images or other files (video, pdf, etc) and the feed bucket type allows for messages to be shared."
      >
        <Controller
          as={<SelectFormControl choices={convertEnumToArray(bucketType)} />}
          defaultValue={bucket.kind || 1}
          rules={{ required: true }}
          name="kind"
          control={control}
          isInvalid={errors.kind !== undefined}
        />
      </FormGroup>
    );
  }

  function getAllowUserCreateLabel() {
    // Returns the label to show depending on the bucket type and if the setting is enabled.
    switch (bucket.kind) {
      case bucketType.images:
        return "Allow users to create uploads";
      case bucketType.feed:
        return "Allow users to create new messages";
      default:
        return "Allow users to upload content to this bucket";
    }
  }

  function renderExtraFields() {
    /* There are certain fields that should not be available when editting or creating through the
       tier settings, because the registration tier and public are already set through where you're
       choosing to edit/add the bucket.
    */

    if (!showAllFields) return null;

    function renderDefaultValues() {
      return bucket.registrationTiers.map((tierId) => {
        const fullTier = project.tiers.find((tier) => tier.id === tierId);
        return { value: fullTier.id, label: fullTier.title };
      });
    }

    const publicToggleLabel = (
      <>
        <span>Allow public viewing</span>
        <InfoTooltip text="By making the bucket public, anyone with access to the project will see it." />
      </>
    );

    return (
      <>
        <FormGroup errors={bucket.isPublic.errors}>
          <Controller
            render={({ onChange, value, ref }, _) => {
              return (
                <Form.Check
                  type="switch"
                  label={publicToggleLabel}
                  onChange={(e) => onChange(e.target.checked)}
                  id="is-public-toggle"
                  checked={value}
                  ref={ref}
                  defaultValue={bucket.isPublic}
                />
              );
            }}
            name="isPublic"
            control={control}
          />
        </FormGroup>
        {!watchIsPublic && (
          <FormGroup
            label="Registration tiers"
            errors={bucket.registrationTiers.errors}
          >
            <Controller
              render={({ onChange, ref }) => (
                <Select
                  options={tierChoices}
                  isMulti
                  ref={ref}
                  closeMenuOnSelect={false}
                  onChange={(objects) =>
                    onChange(objects.map((obj) => obj.value))
                  }
                  defaultValue={renderDefaultValues()}
                  placeholder="Select which tiers to limit viewing to"
                />
              )}
              control={control}
              name="registrationTiers"
            />
          </FormGroup>
        )}
      </>
    );
  }

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormGroup
        label="Name"
        errors={errors.title}
        tooltipText='Buckets are containers that you and/or your enrolled users can upload content into.  Choose a name that best describes the type of bucket you would like to share with people. For example: "Student Work" for a container where your students can upload and share their personal work with each other.'
      >
        <Controller
          autoFocus
          as={Form.Control}
          name="title"
          control={control}
          isInvalid={errors.title !== undefined}
          rules={{ required: true, maxLength: 32 }}
        />
      </FormGroup>
      {renderTypeField()}

      <FormGroup errors={errors.allowUserCreate}>
        <Controller
          render={({ onChange, value, ref }, _) => {
            return (
              <Form.Check
                type="switch"
                label={getAllowUserCreateLabel()}
                onChange={(e) => onChange(e.target.checked)}
                id="allow-user-create-toggle"
                checked={value}
                defaultValue={bucket.allowUserCreate}
              />
            );
          }}
          name="allowUserCreate"
          control={control}
        />
      </FormGroup>

      {renderExtraFields()}

      <FormSubmitDivider />
      <ErrorText text={formError} />

      <StyledButtonContainer hasMultiple={backAction !== undefined}>
        {backAction && <ModalBackButton onClick={backAction} />}
        <LoadingButton
          variant="primary"
          type="submit"
          isLoading={isSubmitting}
          className="float-right"
        >
          {isUpdating ? "Save" : "Create"}
        </LoadingButton>
      </StyledButtonContainer>
    </BaseForm>
  );
}

BucketForm.propTypes = {
  // Not necessarily a full bucket object, but does provide default values for the bucket form.
  bucket: PropTypes.object.isRequired,

  // Function to close the modal the form is in.
  closeModal: PropTypes.func.isRequired,

  // Sometimes we supply the registration tier & public previous to the form.
  showAllFields: PropTypes.bool,

  // Determines if the user should be navigated to the newly created bucket.
  navigateAfterCreate: PropTypes.bool,

  // Action to take the user to the previous section of a modal, if applicable.
  backAction: PropTypes.func,
};

BucketForm.defaultProps = {
  closeModal: () => {},
  showAllFields: false,
  navigateAfterCreate: false,
};

export default BucketForm;
