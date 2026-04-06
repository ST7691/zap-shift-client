import React from "react";
// import { Link} from "react-router";
import ZapShip from "./ZapShip";
import useAuth from "../Pages/hooks/useAuth";
import { NavLink, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Nabver = () => {
  const { user, signOutUser } = useAuth();
  // const links = (
  //   <>
  //     <li>
  //       <NavLink to={"/"}>Home</NavLink>
  //     </li>
  //     <li>
  //       {" "}
  //       <NavLink to={"/coverage"}>Coverage</NavLink>
  //     </li>
  //     <li>
  //       {" "}
  //       <NavLink to={"/about"}>About</NavLink>
  //     </li>
  //     <li>
  //       <details>
  //         <summary>Parent</summary>
  //         <ul className="p-2 bg-base-100 w-40 z-1">
  //           <li>
  //             <a>Submenu 1</a>
  //           </li>
  //           <li>
  //             <a>Submenu 2</a>
  //           </li>
  //         </ul>
  //       </details>
  //     </li>
  //     <li>
  //       <a>Item 3</a>
  //     </li>
  //   </>
  // );
  const links = [
    { name: "Home", path: "/" },
    { name: "Coverage", path: "/coverage" },
    { name: "Send A Parcel", path: "/sendparcel" },
    // user logged in হলে দেখাবে
    ...(user ? [{ name: "DashBoard", path: "/dashboard" }] : []),

    { name: "About Us", path: "/about" },
  ];
  // log out ---------------
  const logout = () => {
    signOutUser()
      .then(result => {
        console.log(result)
         // alert
                Swal.fire({
                  position: "top",
                  icon: "success",
                  title: "Log Out  successfuly",
                  showConfirmButton: false,
                  timer: 1500,
                });
      })
      .catch(error =>
      { console.log(error) }); 
  };
  return (
    <div className="navbar bg-base-100 mb-[30px] shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {/* link */}
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "btn btn-primary  text-secondary rounded-full" // ✅ active bg-primary
                      : "btn btn-ghost "
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <a className=" text-xl">
          <ZapShip></ZapShip>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {" "}
          {/* link  */}
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-primary text-secondary rounded-full" // ✅ active bg-primary
                    : "btn btn-ghost "
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end gap-2 lg:gap-5">
        {user ? (
          // ✅ User logged in → Sign Out button
          <button onClick={logout} className="btn btn-primary text-secondary">
            Log Out
          </button>
        ) : (
          // ✅ User not logged in → Sign In + Sign Up
          <>
            <Link
              className="btn btn-outline btn-primary text-secondary"
              to={"/signin"}
            >
              Log In
            </Link>
            <Link className="btn btn-primary text-secondary" to={"/signup"}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Nabver;
