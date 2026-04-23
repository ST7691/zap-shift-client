import React from "react";

import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
const AssignDeliveris = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const { data: parcels = [],refetch } = useQuery({
    queryKey: ["parcels", user?.email, "diver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&delivery_status=diver_assigned`,
      );
      return res.data;
    },
  });
  // handel accept delivris
  const handelDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = {
      delivery_status: status,
      riderId: parcel.riderId,
      trackingId:parcel.trackingId,
    };

    let message = `parcel status is updated with ${status.split("_").join(" ")}`;
    axiosSecure
      .patch(`parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          // alert
          Swal.fire({
            position: "top",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <h2 className="lg:text-4xl text-2xl">
        Parcels Pendding pickup :{parcels.length}{" "}
      </h2>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Confirm</th>
              <th> Other Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>
                  {parcel.delivery_status === "diver_assigned" ? (
                    <>
                      {/* accept button */}
                      <button
                        onClick={() =>
                          handelDeliveryStatusUpdate(parcel, "rider_arriving")
                        }
                        className="btn btn-primary  text-black"
                      >
                        Accept
                      </button>
                      {/* reject button */}
                      <button className="btn btn-warning text- black ms-2">
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>Accepted</span>
                  )}
                </td>
                <td>
                  {" "}
                  {/*pickup button */}
                  <button
                    onClick={() =>
                      handelDeliveryStatusUpdate(parcel, "parcel_picked_up")
                    }
                    className="btn btn-primary  text-black"
                  >
                    Mark as Pickup
                  </button>
                  {/* delivery button */}
                  <button
                    onClick={() =>
                      handelDeliveryStatusUpdate(parcel, "parcel_delivered")
                    }
                    className="btn btn-primary ms-2 text-black"
                  >
                    Mark as Delivered
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

export default AssignDeliveris;
