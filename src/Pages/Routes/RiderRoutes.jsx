import React from "react";
import useAuth from "../hooks/useAuth";
import UseRoles from "../hooks/UseRoles";
import { MdFormatListBulletedAdd } from "react-icons/md";
import Forbbiden from "../Forbbiden/Forbbiden";
import Loading from "../Loading/Loading";

const RiderRoutes = ({ children }) => {
  const { loading ,user} = useAuth();
  const { role, roleLoadng } = UseRoles();
  if (loading || !user|| roleLoadng) {
    return <Loading></Loading>;
  }
  if (role !== "rider") {
    return <Forbbiden></Forbbiden>;
  }
  return children;
};

export default RiderRoutes;
