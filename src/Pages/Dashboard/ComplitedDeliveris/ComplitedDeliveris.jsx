import React from "react";
import useAuth from "../../hooks/useAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ComplitedDeliveris = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const { data: parcels = [], } = useQuery({
    queryKey: ["parcels", user?.email, "diver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&delivery_status=parcel_delivered`,
      );
      return res.data;
    },
  });
  const calculatePayOut = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.deliveryCost * 0.8;
    } else {
      return parcel.deliveryCost * 0.6;
    }
  };
  return (
    <div>
      <h2 className="lg:text-4xl text-2xl">
        Completed Deliveris :{parcels.length}{" "}
      </h2>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>parcel</th>

              <th>Pickup Distric</th>
              <th>Created At</th>
              <th>Cost</th>
              <th>Payout cost </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{parcel.creation_date}</td>
                <td>{parcel.deliveryCost}</td>

                <td>{calculatePayOut(parcel)}</td>
                <td>
                  {/* assign button  */}
                  <button className="btn btn-primary text-black">
                  Cash Out
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

export default ComplitedDeliveris;
