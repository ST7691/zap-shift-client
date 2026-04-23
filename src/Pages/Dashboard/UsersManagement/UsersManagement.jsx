import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { GoShieldSlash } from "react-icons/go";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
const UsersManagement = () => {
  const [searchText,setSearchText] = useState('')
  const axiosSecure = UseAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users",searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });
  // handle make user admin
  const handleMakeUserAdmin = (user) => {
    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        // alert
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${user.displayName} User mark as admin.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
    };
    // admin remove handle
    const handleRemoveAdmin = user => {
        const roleInfo = { role: 'user' }
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                  refetch();
                  // alert
                  Swal.fire({
                    position: "top",
                    icon: "success",
                    title: `${user.displayName} Remove from admin.`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
        })
    }
  return (
    <div >
      <h2 className="lg:text-5xl text-2xl text-left mb-5">Manage users :{users.length} </h2>
      {/* search users */}
      {/* <p>text :{ searchText}</p> */}
      <label className="input mb-5">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          onChange={(e)=>setSearchText(e.target.value)}
          type="search"
          required placeholder="Search users " />
      </label>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Users</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Others Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="user img">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold">
                        {user.displayName}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" ? (
                    // remove admin button
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="bg-red-700 btn btn-square"
                    >
                      <GoShieldSlash />
                    </button>
                  ) : (
                    // make admin button
                    <button
                      className="btn btn-square bg-green-600"
                      onClick={() => handleMakeUserAdmin(user)}
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>
                <td>Actions</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
