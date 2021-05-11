import { useEffect, useState } from "react";
import Router from "routes/Base";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "features/api";
import { ToastProvider } from "react-toast-notifications";
import { ModalProvider } from "react-modal-hook";
import { ThemeProvider } from "styled-components";
import { navigate } from "@reach/router";

import { fetchMe, verifyToken, refreshToken } from "features/accounts/thunks";
import LoadingContainer from "components/loading/Container";
import { logoutUser } from "features/accounts/slice";
import { fetchContentTypes } from "features/contentTypes/thunks";
import theme from "./theme";

import "react-datetime/css/react-datetime.css";

function App() {
  const [isReady, setIsReady] = useState(false);
  const token = useSelector((state) => state.account.token);
  const _refreshToken = useSelector((state) => state.account.refresh);
  const dispatch = useDispatch();

  useEffect(() => {
    // Make sure our axios token is valid and loaded.
    async function verify() {
      const action = await dispatch(verifyToken({ token }));
      if (action.type === "VERIFY_TOKEN/rejected") {
        dispatch(logoutUser());
        navigate("/");
      } else {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        dispatch(fetchMe());

        if (_refreshToken && !isReady)
          dispatch(refreshToken({ token: _refreshToken }));
      }

      setIsReady(true);
    }

    if (token !== "" && !isReady) verify();
    else setIsReady(true);
  }, [token, dispatch, _refreshToken, isReady]);

  useEffect(() => dispatch(fetchContentTypes()), [dispatch]);

  if (isReady)
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <ToastProvider
            placement="bottom-right"
            autoDismissTimeout={3000}
            autoDismiss
          >
            <ModalProvider>
              <Router />
            </ModalProvider>
          </ToastProvider>
        </ThemeProvider>
      </div>
    );
  else return <LoadingContainer />;
}

export default App;
