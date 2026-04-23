import { createBrowserRouter } from "react-router";
import MainRoot from "../Layout/MainRoot";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import SignIn from "../Pages/Authetication/SignIn";
import SignUp from "../Pages/Authetication/SignUp";
import About from "../Pages/About/About";
import Coverage from "../Pages/Coverage/coverage";
import PrivetRoutes from "../Pages/Routes/PrivetRoutes";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layout/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/payment/Payment";
import { PaymentSuccess } from "../Pages/Dashboard/payment/PaymentSuccess";
import { PaymentCancelled } from "../Pages/Dashboard/payment/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import Rider from "../Pages/Rider/Rider";
import ApprovesRider from "../Pages/Dashboard/ApproveRider/ApprovesRider";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";
import AdminRoutes from "../Pages/Routes/AdminRoutes";
import AssignDeliveris from "../Pages/Dashboard/AssignDeliveris/AssignDeliveris";
import RiderRoutes from "../Pages/Routes/RiderRoutes";
import ComplitedDeliveris from "../Pages/Dashboard/ComplitedDeliveris/ComplitedDeliveris";
import ParcelTrack from "../Pages/ParcelTrack/ParcelTrack";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainRoot,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/rider",
        loader: () => fetch("../../public/data/districts.json"),
        element: (
          <PrivetRoutes>
            <Rider></Rider>
          </PrivetRoutes>
        ),
      },
      {
        path: "/sendparcel",
        loader: () => fetch("../../public/data/districts.json"),
        element: (
          <PrivetRoutes>
            <SendParcel></SendParcel>
          </PrivetRoutes>
        ),
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("../../public/data/districts.json"),
      },
      {
        path: "/parcel-track/:trackingId",
        Component:ParcelTrack,
      },
    ],
  },
  // authlay out
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "/signin", Component: SignIn },
      { path: "/signup", Component: SignUp },
    ],
  },
  // deshboard ----------
  {
    path: "/dashboard",
    element: (
      <PrivetRoutes>
        <DashboardLayout></DashboardLayout>{" "}
      </PrivetRoutes>
    ),
    children: [
      {
        path: "myparcels",
        Component: MyParcels,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cencelled",
        Component: PaymentCancelled,
      },
      // ---------------------riders routes------------------
      {
        path: "assign-deliveris",
        element: (
          <RiderRoutes>
            <AssignDeliveris></AssignDeliveris>
          </RiderRoutes>
        ),
      },
      {
        path: "completed-deliveris",
        element: (
          <RiderRoutes>
            <ComplitedDeliveris></ComplitedDeliveris>
          </RiderRoutes>
        ),
      },
      //------------------------------ admin routes------------------------
      {
        path: "approves-rider",
        element: (
          <AdminRoutes>
            <ApprovesRider></ApprovesRider>
          </AdminRoutes>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRoutes>
            <UsersManagement></UsersManagement>
          </AdminRoutes>
        ),
      },
      {
        path: "assign-riders",
        element: (
          <AdminRoutes>
            <AssignRiders></AssignRiders>
          </AdminRoutes>
        ),
      },
    ],
  },
]);
