import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../Loading/Loading";
import UseRoles from "../hooks/UseRoles";
import Forbbiden from "../Forbbiden/Forbbiden";

const AdminRoutes = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = UseRoles();
  if (loading || roleLoading) {
    return <Loading></Loading>;
  }
  if (role !== "admin") {
    return <Forbbiden></Forbbiden>;
  }
  return children;
};

export default AdminRoutes;
