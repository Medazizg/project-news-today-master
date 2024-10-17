import React from "react";
import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ path, element }) {
  const profile = localStorage.getItem("profile");
  const isAuthenticated = profile ?  JSON.parse(profile)?.token !== null : false;

  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
      
    <Navigate to="/sign" replace />
  );
}

export default PrivateRoute;
