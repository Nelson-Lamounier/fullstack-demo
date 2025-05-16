import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./utils/error/error-boundary";

import Shop from "./routes/Shop";
import Home from "./routes/Home";

import Navigation from "./routes/Navigation";


import Checkout from "./pages/checkout/Checkout";
import OrderConfirmation from "./pages/order/OrderConfirmation";
import SignUpForm from "./pages/signup/SingUp";

import SignInForm from "./pages/singin/SignIn";

import { checkUserSession } from "@/store";


import Layout from "./layout/Layout";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route element={<Layout />}>
              <Route path="category/*" element={<Shop />} />
              <Route path="signin" element={<SignInForm />} />
              <Route path="signup" element={<SignUpForm />} />
              <Route path="checkout" element={<Checkout />} />
              <Route
                path="order-confirmation"
                element={<OrderConfirmation />}
              />
            </Route>
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default App;
