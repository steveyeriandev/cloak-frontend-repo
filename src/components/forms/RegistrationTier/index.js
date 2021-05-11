import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import LoadingButton from "components/buttons/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faSave,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import BaseForm from "components/forms/Base";
import ErrorText from "components/forms/shared/ErrorText";
import Select from "components/controls/Select";
import FormGroup from "components/forms/shared/FormGroup";
import Loading from "components/loading/Loading";
import useSetFieldErrors from "hooks/SetFieldErrors";
import {
  updateRegistrationTier,
  createRegistrationTier,
} from "features/tiers/thunks";
import { fetchProjectEnrollments } from "features/projects/thunks";
import DatePicker from "../datetime/DatePicker";
import DateTimePicker from "../datetime/DateTimePicker";

function RegistrationTierForm({
  registrationTier,
  closeModal,
  confirmDelete,
  activateSplitSection,
  isLoadingSplits,
  ...props
}) {
  // Form to handle various crud actions on the registration tier resource.

  const { handleSubmit, control, errors, setError } = useForm({
    defaultValues: registrationTier,
  });
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [formErrorText, setFormErrorText] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(false);
  const project = useSelector((state) => state.projects.detail);
  const user = useSelector((state) => state.account.user);
  const enrollments = useSelector((state) => state.projects.detail.enrollments);
  const setFieldErrors = useSetFieldErrors(setError);

  // Determines if we're creating or updating a tier.
  const isUpdating = registrationTier && registrationTier.id !== undefined;

  useEffect(() => {
    async function fetchEnrollments() {
      await dispatch(fetchProjectEnrollments(registrationTier.project));
      setEnrollmentsLoading(false);
    }

    if (enrollments === undefined && isUpdating) {
      /* The enrollments have not been loaded yet. We need to load them for this form as the submit
         footer is dependent upon it.
      */
      setEnrollmentsLoading(true);
      fetchEnrollments();
    }
  }, []);

  if (enrollmentsLoading || (enrollments === undefined && isUpdating))
    return (
      <div className="text-center">
        <Loading />
      </div>
    );

  const onSubmit = async (data) => {
    // Send action to either create or update a registration tier.
    setFormErrorText(null);
    setIsSubmitting(true);

    // TODO: schedules is no longer used, but causes error on server if not included.
    data.schedules = [];

    // For certain fields, if they are a blank string they should be converted to null;
    const convertToNullFields = [
      "startDate",
      "endDate",
      "registrationStartDate",
      "registrationEndDate",
      "price",
      "maximumEnrollments",
    ];
    convertToNullFields.forEach((fieldName) => {
      if (data[fieldName] === "") data[fieldName] = null;
    });

    let action = new Promise(() => {});

    if (registrationTier !== undefined) {
      // If there is time passed in for date fields, we need to clean them.
      action = await dispatch(
        updateRegistrationTier({
          registrationTierId: registrationTier.id,
          payload: data,
        })
      );
    } else {
      data.project = project.id;
      action = await dispatch(createRegistrationTier(data));
    }

    // Now we can handle the action.
    if (action.type === "UPDATE_REGISTRATION_TIER/fulfilled") {
      addToast("Registration tier updated successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      closeModal();
    } else if (action.type === "UPDATE_REGISTRATION_TIER/rejected") {
      setFieldErrors(action.payload.data);

      const errorText =
        action.payload.data &&
        (action.payload.data.detail || "Error updating registration tier.");
      setFormErrorText(errorText);
    } else if (action.type === "CREATE_REGISTRATION_TIER/fulfilled") {
      addToast("New registration tier created.", {
        appearance: "success",
        autoDismiss: true,
      });
      closeModal();
    } else if (action.type === "CREATE_REGISTRATION_TIER/rejected") {
      setFieldErrors(action.payload.data);
      const errorText =
        action.payload.data &&
        (action.payload.data.detail || "Error creating registration tier.");
      setFormErrorText(errorText);
    }

    setIsSubmitting(false);
    return action;
  };

  function renderSubmitFooter() {
    /* Depending on if we are editing a tier and/or if there are enrollments, the submit footer will
       change depending on what's available for that tier.
    */

    if (registrationTier) {
      // Only should render here if editing a registration tier.
      const tierEnrollments = enrollments.filter((enrollment) => {
        return enrollment.registrationTier.id === registrationTier.id;
      });

      const deleteButton =
        tierEnrollments.length === 0 ? (
          <Button variant="outline-danger" onClick={confirmDelete}>
            <FontAwesomeIcon icon={faTrashAlt} /> Delete
          </Button>
        ) : (
          <Button
            variant="outline-danger"
            disabled
            title="Tiers with enrollments may not be deleted"
          >
            <FontAwesomeIcon icon={faTrashAlt} /> Delete
          </Button>
        );

      // The button text for viewing/manage splits changes depending on if owner.
      const splitVerb = project.owner === user.id ? "Manage" : "View";

      return (
        <div className="d-flex justify-content-between">
          {deleteButton}
          {project.teachers.length > 1 && (
            <LoadingButton
              isLoading={isLoadingSplits}
              variant="secondary"
              onClick={activateSplitSection}
              width={150}
            >
              <FontAwesomeIcon icon={faChartPie} /> {splitVerb} Split
            </LoadingButton>
          )}
          <LoadingButton
            variant="primary"
            type="submit"
            isLoading={isSubmitting}
          >
            <FontAwesomeIcon icon={faSave} /> Save
          </LoadingButton>
        </div>
      );
    }

    return (
      <div className="text-center">
        <LoadingButton variant="primary" type="submit" isLoading={isSubmitting}>
          Save
        </LoadingButton>
      </div>
    );
  }

  function getDefaultRequiresTier() {
    // Return the requires tier object, if this tier has a required tier.
    if (!registrationTier || registrationTier.requiresTier === null)
      return null;

    const tierObj = project.tiers.find(
      (tier) => tier.id === registrationTier.requiresTier
    );
    return tierObj ? { value: tierObj.id, label: tierObj.title } : null;
  }

  return (
    <BaseForm onSubmit={handleSubmit(onSubmit)} {...props}>
      <Form.Row>
        <Col>
          <FormGroup label="Title*" errors={errors.title}>
            <Controller
              as={Form.Control}
              rules={{ required: true }}
              isInvalid={errors.title !== undefined}
              name="title"
              control={control}
              defaultValue=""
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup label="Price" errors={errors.price}>
            <Controller
              as={<Form.Control type="number" min="0" step="1" />}
              name="price"
              control={control}
              defaultValue=""
              isInvalid={errors.price !== undefined}
            />
          </FormGroup>
        </Col>
      </Form.Row>

      <Form.Row>
        <Col>
          <FormGroup label="Start Date" errors={errors.startDate}>
            <Controller
              as={DatePicker}
              isInvalid={errors.startDate !== undefined}
              name="startDate"
              control={control}
              defaultValue=""
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup label="End Date" errors={errors.endDate} isCustomControl>
            <Controller
              as={DatePicker}
              isInvalid={errors.endDate !== undefined}
              name="endDate"
              control={control}
              defaultValue=""
            />
          </FormGroup>
        </Col>
      </Form.Row>

      <Form.Row>
        <Col>
          <FormGroup
            label="Registration Start On"
            errors={errors.registrationStartDate}
            isCustomControl
          >
            <Controller
              as={DateTimePicker}
              isInvalid={errors.registrationStartDate !== undefined}
              name="registrationStartDate"
              control={control}
              defaultValue=""
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup
            label="Registration Ends On"
            errors={errors.registrationEndDate}
            isCustomControl
          >
            <Controller
              as={DateTimePicker}
              isInvalid={errors.registrationEndDate !== undefined}
              name="registrationEndDate"
              control={control}
              defaultValue=""
            />
          </FormGroup>
        </Col>
      </Form.Row>

      <Form.Row>
        <Col>
          <FormGroup
            label="Is visible"
            isCustomControl
            tooltipText="Determines if the payment button shows up on class info page."
          >
            <Controller
              render={({ onChange, value, ref }, _) => {
                return (
                  <Form.Check
                    type="switch"
                    onChange={(e) => onChange(e.target.checked)}
                    id="is-visible-toggle"
                    checked={value}
                    inputRef={ref}
                    defaultValue={
                      (registrationTier && registrationTier.isVisible) || true
                    }
                  />
                );
              }}
              defaultValue={true}
              name="isVisible"
              control={control}
            />
          </FormGroup>
        </Col>

        <Col sm={6}>
          <FormGroup
            label="Maximum Enrollments"
            errors={errors.maximumEnrollments}
            tooltipText="After the class reaches a certain amount of enrollments, no more students will be admitted."
          >
            <Controller
              as={<Form.Control type="number" min="0" step="1" />}
              isInvalid={errors.maximumEnrollments !== undefined}
              name="maximumEnrollments"
              control={control}
              defaultValue=""
            />
          </FormGroup>
        </Col>
      </Form.Row>

      <Form.Row>
        <Col>
          <FormGroup
            label="Requires tier"
            isCustomControl
            tooltipText="Only allow users with another tier to see this payment button."
          >
            <Controller
              render={({ onChange }) => (
                <Select
                  isClearable
                  options={project.tiers.map((tier) => ({
                    value: tier.id,
                    label: tier.title,
                  }))}
                  onChange={(selected) =>
                    onChange(selected ? selected.value : null)
                  }
                  defaultValue={getDefaultRequiresTier()}
                />
              )}
              name="requiresTier"
              control={control}
            />
          </FormGroup>
        </Col>
      </Form.Row>

      <ErrorText text={formErrorText} />
      {renderSubmitFooter()}
    </BaseForm>
  );
}

RegistrationTierForm.propTypes = {
  // The registration tier that we're modifying. When creating new tier, this will be undefined.
  registrationTier: PropTypes.object,

  // A function to close the modal if the form is inside of one.
  closeModal: PropTypes.func,

  // A function to run when the user wants to delete the registration tier.
  confirmDelete: PropTypes.func,

  // Change the modal to display the revenue split section.
  activateSplitSection: PropTypes.func,

  // Determines if the revenue split data is loading.
  isLoadingSplits: PropTypes.bool,
};

RegistrationTierForm.defaultProps = {
  closeModal: () => {},
  isLoadingSplits: false,
};

export default RegistrationTierForm;
