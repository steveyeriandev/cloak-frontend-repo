import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";
import { useToasts } from "react-toast-notifications";

import { loginGoogleUser } from "features/accounts/thunks";

function GoogleAuthButton({ closeModal }) {
  // Button to initiate oauth with Google.
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  async function responseGoogleSuccess(response) {
    const action = await dispatch(
      loginGoogleUser({ accessToken: response.accessToken })
    );
    if (action.type === "LOGIN_GOOGLE/fulfilled") {
      closeModal();
      addToast("You're now logged in.", { appearance: "success" });
    } else {
      addToast(
        "Error authenticating with google. Please check your internet connection.",
        {
          appearance: "error",
          autoDismissTimeout: 5000,
        }
      );
    }
  }

  function responseGoogleFailure() {
    addToast(
      "Error authenticating with google. Please check your internet connection.",
      {
        appearance: "error",
        autoDismissTimeout: 5000,
      }
    );
  }

  const googleClientId =
    process.env.REACT_APP_ENV === "production"
      ? "805139660786-2rhijorbh89sqpfk5tgjn1bmbsnflhk7.apps.googleusercontent.com"
      : "805139660786-25ok5nio3p5b6cd79qj3kgu954t8pqbs.apps.googleusercontent.com";

  return (
    <GoogleLogin
      clientId={googleClientId}
      text="Login with google"
      onSuccess={responseGoogleSuccess}
      onFailure={responseGoogleFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
}

GoogleAuthButton.propTypes = {
  closeModal: PropTypes.func,
};

export default GoogleAuthButton;
