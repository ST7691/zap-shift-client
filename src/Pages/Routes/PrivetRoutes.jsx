import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivetRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation()
 console.log(location)
  if (loading) {
    return (
      <div>
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }
  if (!user) {
    return <Navigate to={"/signin"} state={{from : location.pathname}}></Navigate>;
  }
  return children;
};

export default PrivetRoutes;
