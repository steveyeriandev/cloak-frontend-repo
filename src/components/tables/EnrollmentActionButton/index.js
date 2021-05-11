import React, { useState } from "react";
import PropTypes from "prop-types";
import { useModal } from "react-modal-hook";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  faPaperPlane,
  faHandHoldingUsd,
} from "@fortawesome/free-solid-svg-icons";

import ActionButton from "components/buttons/ActionButton";
import FormModal from "components/modals/Form";
import ConfirmActionModal from "components/modals/ConfirmAction";
import EmailForm from "components/forms/Email";
import EnrollmentForm from "components/forms/Enrollment";
import UserBlock from "components/projects/UserBlock";
import { refundEnrollment } from "features/enrollments/thunks";
import { enrollmentsUrl } from "features/enrollments/api";
import { enrollmentStatus } from "utils/enums";
import EnrollmentService from "features/enrollments/service";

function EnrollmentActionButton({ enrollment, ...props }) {
  // Renders an action button for an enrollment button in the enrollment table.
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [isRefunding, setIsRefunding] = useState(false);
  const [isSendingInvoice, setIsSendingInvoice] = useState(false);
  const [sendInvoiceErrorMessage, setSendInvoiceErrorMessage] = useState();
  const [confirmDeleteError, setConfirmDeleteError] = useState();

  const [showSendInvoiceModal, hideSendInvoiceModal] = useModal(() => {
    const enrollmentService = new EnrollmentService();

    async function _sendInvoice() {
      setSendInvoiceErrorMessage();
      setIsSendingInvoice(true);

      try {
        await enrollmentService.sendInvoice(enrollment.id);
        hideSendInvoiceModal();
        addToast("Invoice has been sent.", { appearance: "success" });
      } catch (err) {
        setSendInvoiceErrorMessage("Error sending invoice.");
      }

      setIsSendingInvoice(false);
    }

    return (
      <ConfirmActionModal
        onHide={hideSendInvoiceModal}
        title="Send Invoice"
        confirmText="Ok, send"
        confirmIcon={faPaperPlane}
        errorMessage={sendInvoiceErrorMessage}
        confirmAction={_sendInvoice}
        isLoading={isSendingInvoice}
      >
        <p className="text-center">
          <b>{enrollment.student.name}</b> will receive an invoice for
          <b>&nbsp;${enrollment.registrationTier.price}</b>. Once paid, their
          enrollment will become active.
        </p>
      </ConfirmActionModal>
    );
  }, [sendInvoiceErrorMessage, isSendingInvoice]);

  const [showEnrollmentModal, hideEnrollmentModal] = useModal(() => {
    return (
      <FormModal onHide={hideEnrollmentModal} title="Update enrollment">
        <EnrollmentForm
          closeModal={hideEnrollmentModal}
          enrollment={enrollment}
        />
      </FormModal>
    );
  });

  const [
    showRefundConfirmationModal,
    hideRefundConfirmationModal,
  ] = useModal(() => {
    // Shows the confirmation modal to confirm refunding a student.

    async function handleConfirmRefund() {
      setIsRefunding(true);
      setConfirmDeleteError(null);

      const action = await dispatch(refundEnrollment(enrollment.id));
      if (action.type === "REFUND_ENROLLMENT/rejected") {
        setConfirmDeleteError("Error refunding student");
      } else if (action.type === "REFUND_ENROLLMENT/fulfilled") {
        hideRefundConfirmationModal();
        addToast("Refund successful", {
          autoDismiss: true,
          appearance: "success",
        });
      }

      setIsRefunding(false);
    }

    return (
      <ConfirmActionModal
        onHide={hideRefundConfirmationModal}
        confirmAction={handleConfirmRefund}
        isLoading={isRefunding}
        errorMessage={confirmDeleteError}
        title="Confirm Refund"
        confirmText="Yes, refund"
        confirmIcon={faHandHoldingUsd}
      >
        <div className="text-center">
          <UserBlock user={enrollment.student} className="mb-4" />
          <p>
            Are you sure you want to refund <b>{enrollment.student.name}</b>?
          </p>
        </div>
      </ConfirmActionModal>
    );
  }, [isRefunding, confirmDeleteError]);

  const [showEmailModal, hideEmailModal] = useModal(() => {
    return (
      <FormModal title="Send email" onHide={hideEmailModal}>
        <EmailForm
          toDisabled
          apiUrl={`${enrollmentsUrl}${enrollment.id}/email/`}
          email={{ to: enrollment.student.email }}
          closeModal={hideEmailModal}
        />
      </FormModal>
    );
  });

  return (
    <ActionButton {...props}>
      <Dropdown.Item onClick={showEmailModal}>Email</Dropdown.Item>
      <Dropdown.Item
        disabled={enrollment.status === enrollmentStatus.refunded}
        onClick={showRefundConfirmationModal}
      >
        Refund
      </Dropdown.Item>
      <Dropdown.Item onClick={showEnrollmentModal}>Update</Dropdown.Item>
      <Dropdown.Item onClick={showSendInvoiceModal}>Send invoice</Dropdown.Item>
    </ActionButton>
  );
}

EnrollmentActionButton.propTypes = {
  // The enrollment object that we're basing the actions on.
  enrollment: PropTypes.object.isRequired,
};

export default EnrollmentActionButton;
