import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Loading from "../Loading/Loading";

const PrivetRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation()
 console.log(location)
  if (loading) {
    return <Loading></Loading>
  }
  if (!user) {
    return <Navigate to={"/signin"} state={{from : location.pathname}}></Navigate>;
  }
  return children;
};

export default PrivetRoutes;
