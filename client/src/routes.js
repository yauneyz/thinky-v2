import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Main from "./components/Main";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import VerifyEmail from "./components/VerifyEmail";
import LoadingPage from "./components/LoadingPage";
import EssayPage from "./components/EssayPage";
import ResetPassword from "./components/ResetPassword";
import CheckoutSuccess from "./components/CheckoutSuccess";
import CheckoutCancel from "./components/CheckoutCancel";
import { AuthContext } from "./contexts";

const AppRoutes = () => {
  const { auth, emailVerified } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth auth={auth} emailVerified={emailVerified}>
            <Main />
          </RequireAuth>
        }
      />
      <Route
        path="/landing"
        element={
          <SkipIfAuth auth={auth}>
            <Landing />
          </SkipIfAuth>
        }
      />
      <Route
        path="/login"
        element={
          <SkipIfAuth auth={auth}>
            <Login />
          </SkipIfAuth>
        }
      />
      <Route
        path="/register"
        element={
          <SkipIfAuth auth={auth}>
            <Register />
          </SkipIfAuth>
        }
      />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="checkout-success" element={<CheckoutSuccess />} />
      <Route path="checkout-cancel" element={<CheckoutCancel />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="loading" element={<LoadingPage />} />
      <Route path="essay" element={<EssayPage />} />
    </Routes>
  );
};

function RequireAuth({ auth, emailVerified, children }) {
  const location = useLocation();
  // Redirect to the landing page
  if (!auth) {
    return <Navigate to="/landing" state={{ from: location }} replace />;
  }
  // Redirect to the email verification page
  else if (!emailVerified) {
    return <Navigate to="/verify-email" state={{ from: location }} replace />;
  }
  return children;
}

function SkipIfAuth({ auth, children }) {
  const location = useLocation();
  // Redirect to the landing page
  if (auth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

export default AppRoutes;
