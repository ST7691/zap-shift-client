import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const axiosSecure = UseAxiosSecure();
  const riderModalRef = useRef();
  const [selecteParcel, setSelecteParcel] = useState(null);
  // parcels dat loade
  const { data: parcels = [], refetch: parcelRefetch } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?delivery_status=pending-pickup",
      );
      return res.data;
  
    },
  });
  console.log(parcels)
  // query rider data modal
  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selecteParcel?.senderDistrict, "available"],
    enabled: !!selecteParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&District=${selecteParcel?.senderDistrict}&workStatus=available`,
      );
      return res.data;
    },
  });
  // handle assign
  const handleAssign = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderName: rider.name,
      riderEmail: rider.email,
      parcelId: selecteParcel?._id,
      trackingId: selecteParcel?.trackingId,
    };
    axiosSecure
      .patch(`/parcels/${selecteParcel?._id}`, riderAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          riderModalRef.current.close();
          parcelRefetch();
          // alert
          Swal.fire({
            position: "top",
            icon: "success",
            title: " Rider has been assign successfuly",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  // modal open---------
  const openAssignRiderModal = (parcel) => {
    setSelecteParcel(parcel);
    // console.log(parcel.senderDistrict);
    riderModalRef.current.showModal();
  };
  return (
    <div>
      <h2 className="text-2xl lg:text-4xl  text-left">
        Assign Riders :{parcels.length}
      </h2>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>parcel</th>
              <th>Cost</th>
              <th>Pickup Distric</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.deliveryCost}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{parcel.creation_date}</td>
                <td>
                  {/* assign button  */}
                  <button
                    onClick={() => openAssignRiderModal(parcel)}
                    className="btn btn-primary text-black"
                  >
                    Find Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* modal */}
      <dialog
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Riders : {riders?.length || 0}</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Rider</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider, index) => (
                  <tr key={rider._id}>
                    <th>{index + 1}</th>
                    <td>{rider.name}</td>
                    <td>{rider.email}</td>
                    <td>
                      <button
                        onClick={() => handleAssign(rider)}
                        className="btn btn-primary text-black"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
