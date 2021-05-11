import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";

import BaseModal from "components/modals/Base";
import ModalHeader from "components/modals/Header";
import RegistrationTierForm from "components/forms/RegistrationTier";
import RevenueSplitForm from "components/forms/RevenueSplit";
import LoadingButton from "components/buttons/Loading";
import { deleteRegistrationTier } from "features/tiers/thunks";
import { fetchRevenueSplits } from "features/revenueSplits/thunks";
import RevenueSplitContainer from "components/revenueSplits/Container";
import RevenueSplitConfirmDelete from "components/revenueSplits/ConfirmDeleteSection";

const RegistrationTierModal = ({ registrationTier, ...props }) => {
  /* The registration modal is a multi-container modal and is the most complicated in the whole
     project. There are many things accomplished in this custom modal including:

    1) Editing the registration tier
    2) Deleting the registration tier
    3) Viewing the revenue splits
    4) Editing a revenue split
    5) Deleting a revenue split

    # General component structure within the modal
    ---
    RegistrationTierModal
      RevenueSplitForm
      RevenueSplitsTable
        RevenueSplitRow
          RevenueSplitActionButton
  */

  // Content section determines the section of the modal that should be shown.
  const [contentSection, setContentSection] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSplits, setIsLoadingSplits] = useState(false);
  const [selectedRevenueSplit, setSelectedRevenueSplit] = useState();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const revenueSplits = useSelector((state) => state.revenueSplits.entities);
  const project = useSelector((state) => state.projects.detail);
  const user = useSelector((state) => state.account.user);

  const isOwner = project.owner === user.id;

  const tierActionVerb =
    registrationTier !== undefined
      ? contentSection === "confirmDelete"
        ? "Delete"
        : "Update"
      : "Create";

  function getHeaderTitle() {
    switch (contentSection) {
      case "viewRevenueSplits":
        return "Revenue Splits";
      case "editRevenueSplit":
        return "Update Revenue Split";
      case "createRevenueSplit":
        return "Create Revenue Split";
      case "deleteRevenueSplit":
        return "Delete Revenue Split";
      default:
        return `${tierActionVerb} Registration Tier`;
    }
  }

  function toggleDeleteConfirmation() {
    const newSection =
      contentSection === "confirmDelete"
        ? "editRegistrationTier"
        : "confirmDelete";
    setContentSection(newSection);
  }

  async function _fetchRevenueSplits() {
    // Fetches the revenue split data for a given registration tier.
    setIsLoadingSplits(true);
    await dispatch(
      fetchRevenueSplits({ registrationTierId: registrationTier.id })
    );
    setIsLoadingSplits(false);
  }

  async function handleDelete() {
    setIsLoading(true);
    const action = await dispatch(deleteRegistrationTier(registrationTier.id));
    if (action.type === "DELETE_REGISTRATION_TIER/fulfilled") {
      setIsLoading(false);
      addToast("Registration tier deleted", { appearance: "success" });
      props.onHide();
    } else {
      setIsLoading(false);
      addToast("Error deleting registration tier", { appearance: "error" });
    }
  }

  async function activateSplitSection() {
    // When the split section is not active yet, we need to get the data firsts.
    await _fetchRevenueSplits();
    setContentSection("viewRevenueSplits");
  }

  function renderBody() {
    /* The main body content of the modal, which can be one of many different sections dealing with
       registration tiers and revenue splits of the registration tier.
    */

    if (contentSection === "confirmDelete")
      return (
        <div>
          <p>
            Deleting a tier is permanent and can't be undone. Are you sure you
            want to delete &nbsp;<b>{registrationTier.title}</b>?
          </p>
          <div className="d-flex justify-content-between">
            <Button variant="link" onClick={toggleDeleteConfirmation}>
              Cancel
            </Button>
            <LoadingButton
              variant="danger"
              onClick={handleDelete}
              isLoading={isLoading}
              width={150}
            >
              Yes, delete
            </LoadingButton>
          </div>
        </div>
      );
    else if (contentSection === "viewRevenueSplits")
      return (
        <RevenueSplitContainer
          revenueSplits={revenueSplits}
          setContentSection={setContentSection}
          canCreate={isOwner}
          modalActionProps={{
            navigateEdit: () => setContentSection("editRevenueSplit"),
            navigateDeleteConfirm: () =>
              setContentSection("deleteRevenueSplit"),
            setSelectedRevenueSplit: setSelectedRevenueSplit,
          }}
        />
      );
    else if (contentSection === "editRevenueSplit")
      return (
        <RevenueSplitForm
          successAction={() => setContentSection("viewRevenueSplits")}
          backAction={() => setContentSection("viewRevenueSplits")}
          revenueSplit={selectedRevenueSplit}
        />
      );
    else if (contentSection === "createRevenueSplit")
      return (
        <RevenueSplitForm
          successAction={() => setContentSection("viewRevenueSplits")}
          backAction={() => setContentSection("viewRevenueSplits")}
          revenueSplit={{ registrationTier }}
        />
      );
    else if (contentSection === "deleteRevenueSplit")
      return (
        <RevenueSplitConfirmDelete
          revenueSplit={selectedRevenueSplit}
          successAction={() => setContentSection("viewRevenueSplits")}
        />
      );

    // Default section is to show the registration tier form.
    return (
      <RegistrationTierForm
        registrationTier={registrationTier}
        closeModal={props.onHide}
        confirmDelete={toggleDeleteConfirmation}
        activateSplitSection={activateSplitSection}
        isLoadingSplits={isLoadingSplits}
      />
    );
  }

  return (
    <BaseModal {...props}>
      <ModalHeader title={getHeaderTitle()} closeButton />
      <Modal.Body>{renderBody()}</Modal.Body>
    </BaseModal>
  );
};

RegistrationTierModal.propTypes = {
  registrationTier: PropTypes.object,
  onHide: PropTypes.func,
};

export default RegistrationTierModal;
