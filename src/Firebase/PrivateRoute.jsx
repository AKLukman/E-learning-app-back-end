// PrivateRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ContextApi } from "../Context/ContextApi";
import Loading from "../Components/Loading";

const PrivateRoute = ({ element, allowedRoles }) => {
  const { user, userRole, loading } = useContext(ContextApi);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/forbidden" replace />;
  }

  return element;
};

export default PrivateRoute;
