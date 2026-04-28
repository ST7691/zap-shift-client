import React from 'react'
import UseRoles from '../../hooks/UseRoles'
import Loading from '../../Loading/Loading'
import AdminDashBoardHome from '../../Dashboard/DashboardHome/AdminDashboardHome'
import RiderDeshboardHome from '../../Dashboard/DashboardHome/RiderDeshboardHome'
import UserDashboardHome from "../../Dashboard/DashboardHome/UserDashboardHome";

const DashboardHome = () => {
    const { role, roleLoading } = UseRoles()
    if (roleLoading) {
        return <Loading></Loading>
    }
    if (role === 'admin') {
        return <AdminDashBoardHome></AdminDashBoardHome>
    }
    else if (role === 'rider') {
        return <RiderDeshboardHome></RiderDeshboardHome>
    }
    else {
        return <UserDashboardHome></UserDashboardHome>
    }
};
  


export default DashboardHome