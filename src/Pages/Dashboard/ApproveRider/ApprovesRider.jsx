import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { RiDeleteBinLine, RiEditLine, RiEyeLine } from "react-icons/ri";
import { FaEye, FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import Swal from "sweetalert2";

const ApprovesRider = () => {
  const axiosSecure = UseAxiosSecure();

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "panding"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
  // update status rider
  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        // alert
        Swal.fire({
          position: "top",
          icon: "success",
          title: `Riders status is set to ${status}.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  //  handleApproval rider
  const handleApproval = (rider) => {
    updateRiderStatus(rider, "approved");
  };
  // handle reject rider
  const handleRejection = (rider) => {
    updateRiderStatus(rider, "rejected");
  };
  // Delete rider
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete thisRider!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Rider has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };
  return (
    <div>
      <h2 className="lg:text-5xl text-2xl">
        Riders panding approval:{riders.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Distric</th>
              <th>Status</th>
              <th> Work Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.District}</td>
                <td>
                  <p
                    className={`${rider.status === "approved" ? "text-green-800" : "text-red-500"}`}
                  >
                    {rider.status}
                  </p>
                </td>
                <td>{rider.workStatus}</td>
                <td className="flex  gap-1">
                  {/* view button  */}
                  <button className="btn btn-xs  hover:bg-primary ">
                    <FaEye />
                  </button>
                  {/* approved button */}
                  <button
                    className="btn btn-xs  hover:bg-primary "
                    onClick={() => handleApproval(rider)}
                  >
                    <FaUserCheck />
                  </button>
                  {/* rejection  */}
                  <button
                    className="btn btn-xs  hover:bg-primary "
                    onClick={() => handleRejection(rider)}
                  >
                    <IoPersonRemove />
                  </button>
                  {/* rider delete */}
                  <button
                    className="btn btn-xs  hover:bg-primary "
                    onClick={() => handleDelete(rider._id)}
                  >
                    <RiDeleteBinLine />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovesRider;
