import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./api/stripe.api";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";

const clientId = import.meta.env.VITE_API_GOOGLE_CLIENT_ID;
if (!clientId) {
  throw new Error("REACT_APP_GOOGLE_CLIENT_ID is not set");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={clientId}>
          <BrowserRouter>
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
