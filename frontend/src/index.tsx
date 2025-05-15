import React from "react";
// import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { createRoot, hydrateRoot } from "react-dom/client";
import { hydrate, render } from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";
const helmetContext = {};
const Apps = (
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <GoogleOAuthProvider
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
        >
          <HelmetProvider context={helmetContext}>
            <App />
          </HelmetProvider>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
const rootElement = document.getElementById("root");
if (rootElement?.hasChildNodes()) {
  hydrate(Apps, rootElement);
} else {
  render(Apps, rootElement);
}
// React
// ReactDOM.createRoot(document.getElementById("root")!).render(

// );
