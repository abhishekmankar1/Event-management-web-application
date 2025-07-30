import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  return children; // If logged in, show the protected page
};

export default ProtectedRoute;
