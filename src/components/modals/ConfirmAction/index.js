import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BaseModal from "components/modals/Base";
import ModalHeader from "components/modals/Header";
import LoadingButton from "components/buttons/Loading";
import ErrorText from "components/forms/shared/ErrorText";

const ActionContainer = styled.div`
  margin: ${(props) => props.theme.spacing};
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

function ConfirmActionModal({
  confirmAction,
  title,
  isLoading,
  confirmText,
  confirmIcon,
  actionContainerProps,
  confirmButtonProps,
  errorMessage,
  ...props
}) {
  // A generic modal for confirming an action, usually .
  return (
    <BaseModal {...props}>
      {title && <ModalHeader title={title} />}
      <div className="p-4">{props.children}</div>
      <ErrorText text={errorMessage} />
      <ActionContainer {...actionContainerProps}>
        <Button variant="link" onClick={props.onHide}>
          Cancel
        </Button>
        <LoadingButton
          variant="primary"
          onClick={confirmAction}
          isLoading={isLoading}
          width={150}
          {...confirmButtonProps}
        >
          {confirmIcon && <FontAwesomeIcon icon={confirmIcon} />} {confirmText}
        </LoadingButton>
      </ActionContainer>
    </BaseModal>
  );
}

ConfirmActionModal.propTypes = {
  // The action that should be sent if the user is wanting to confirm the deletion of data.
  confirmAction: PropTypes.func.isRequired,

  // Since the action happens outside of the modal, we need to pass in if it's loading.
  isLoading: PropTypes.bool.isRequired,

  // The title shown for the modal.
  title: PropTypes.string,

  // Additional props for the action container.
  actionContainerProps: PropTypes.object,

  // Additional props to be passed to the confirm action button.
  confirmButtonProps: PropTypes.object,

  // Text to display on the confirm button.
  confirmText: PropTypes.string,

  // An error message to show in case something goes wrong.
  errorMessage: PropTypes.string,

  // Optionally pass in a fontawesome icon to render.
  confirmIcon: PropTypes.object,
};

ConfirmActionModal.defaultProps = {
  confirmText: "Yes, delete",
  errorMessage: null,
};

export default ConfirmActionModal;
