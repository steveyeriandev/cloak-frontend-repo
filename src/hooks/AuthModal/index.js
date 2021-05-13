import { useModal } from "react-modal-hook";

import AuthenticationModal from "components/modals/Authentication";

function useAuthenticationModal() {
  // Shared hook to bring up the authentication modal.
  const [showAuthModal, hideAuthModal] = useModal(() => (
    <AuthenticationModal onHide={hideAuthModal} />
  ));

  return showAuthModal;
}

export default useAuthenticationModal;
