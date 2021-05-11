import React from "react";
import ReactDOM from "react-dom";
import "styles/index.scss";
import App from "./App";
import store, { persistor } from "store";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import ErrorFallback from "components/general/ErrorFallback";

Sentry.init({
  dsn:
    "https://262cc7f0ea4c4a08b8c938f62ce57df6@o501679.ingest.sentry.io/5606371",
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 0.1,
});

ReactDOM.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={ErrorFallback}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
