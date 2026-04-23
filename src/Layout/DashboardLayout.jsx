import React from "react";
import ZapShip from "../Shared/ZapShip";
import { NavLink, Outlet } from "react-router";
import { CiHome } from "react-icons/ci";
import UseRoles from "../Pages/hooks/UseRoles";
import { RiEBikeFill } from "react-icons/ri";
import { FaAddressCard, FaBiking, FaRegUser, FaShuttleVan, FaTasks } from "react-icons/fa";
import { SiGoogletasks } from "react-icons/si";

const DashboardLayout = () => {
  const {role} = UseRoles();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard </div>
        </div>{" "}
        {/* Page content here */}
        <div className="mb-5">
          {" "}
          <ZapShip></ZapShip>
        </div>
        <Outlet></Outlet>
      </div>
      {/* Page content here */}

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu w-40 bg-base-200 min-h-full p-4">
          {/* Sidebar content here */}
          {/* home */}
          <li className=" mt-5">
            <NavLink
              to={"/"}
              className="is-drawer-close:tooltip is-drawer-close: tooltip-right"
              data-tip="Home"
            >
              <CiHome />
              <span className="is-drawer-close:hidden">Home</span>
            </NavLink>
          </li>
          {/* my parcels */}
          <li>
            <NavLink
              to={"/dashboard/myparcels"}
              className="is-drawer-close:tooltip is-drawer-close: tooltip-right"
              data-tip="My Parcels"
            >
              <FaShuttleVan />
              <span className="is-drawer-close:hidden">My Parcel</span>
            </NavLink>
          </li>
          {/* payment history */}
          <li>
            <NavLink
              to={"/dashboard/payment-history"}
              className="is-drawer-close:tooltip is-drawer-close: tooltip-right"
              data-tip="Payment History"
            >
              <FaAddressCard />
              <span className="is-drawer-close:hidden"> Payment History</span>
            </NavLink>
          </li>
          {/* ---------------rider role---------- */}
          {role === "rider" && (
            <>
              {/* assign deliveries */}
              <li>
                <NavLink
                  to={"/dashboard/assign-deliveris"}
                  className="is-drawer-close:tooltip is-drawer-close: tooltip-right"
                  data-tip="Assign Deliveris"
                >
                  <FaTasks />
                  <span className="is-drawer-close:hidden">
                    {" "}
                    Assign Deliveris
                  </span>
                </NavLink>
              </li>
              {/* complited deliveries */}
              <li>
                <NavLink
                  to={"/dashboard/completed-deliveris"}
                  className="is-drawer-close:tooltip is-drawer-close: tooltip-right"
                  data-tip="Completed Deliveris"
                >
                  <SiGoogletasks />
                  <span className="is-drawer-close:hidden">
                    {" "}
                    Completed Deliveris
                  </span>
                </NavLink>
              </li>
            </>
          )}
          {/* --------------------admin section---------------------------- */}
          {role === "admin" && (
            <>
              {" "}
              {/* approves riders */}
              <li>
                <NavLink
                  to={"/dashboard/approves-rider"}
                  className="is-drawer-close:tooltip is-drawer-close: tooltip-right"
                  data-tip="Approves Rider"
                >
                  <FaBiking />{" "}
                  <span className="is-drawer-close:hidden">
                    {" "}
                    Approves Rider
                  </span>
                </NavLink>
              </li>
              {/* users menagement */}
              <li>
                <NavLink
                  to={"/dashboard/users-management"}
                  className="is-drawer-close:tooltip is-drawer-close: tooltip-right"
                  data-tip="Users Management"
                >
                  <FaRegUser />
                  <span className="is-drawer-close:hidden">
                    {" "}
                    Users management
                  </span>
                </NavLink>
              </li>
              {/*  assign riders */}
              <li>
                <NavLink
                  to={"/dashboard/assign-riders"}
                  className="is-drawer-close:tooltip is-drawer-close: tooltip-right"
                  data-tip="Assign Riders"
                >
                  <RiEBikeFill />
                  <span className="is-drawer-close:hidden"> Assign Riders</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
