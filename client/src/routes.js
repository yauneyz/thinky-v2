import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Main from "./components/Main";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthContext } from "./contexts";

const AppRoutes = () => {
  const { auth } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth auth={auth}>
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
    </Routes>
  );
};

function RequireAuth({ auth, children }) {
  const location = useLocation();
  // Redirect to the landing page
  if (!auth) {
    return <Navigate to="/landing" state={{ from: location }} replace />;
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
