import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  RiEyeLine,
  RiEditLine,
  RiMoneyDollarCircleLine,
  RiDeleteBinLine,
  RiFileCopyLine,
} from "react-icons/ri";
import { Link, Links } from "react-router";

const MyParcels = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();
  // tanstack query use kore
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my_parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // Copy Tracking ID
  const handleCopyTracking = (tracking_id) => {
    navigator.clipboard.writeText(tracking_id);
    Swal.fire({
      icon: "success",
      title: "Copied!",
      text: `Tracking ID ${tracking_id} copied to clipboard`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Delete Parcel
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this parcel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Parcel has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };

  // View Parcel Details
  const handleView = (parcel) => {
    Swal.fire({
      title: "Parcel Details",
      html: `
        <b>Tracking ID:</b> ${parcel.tracking_id} <br/>
        <b>Parcel Type:</b> ${parcel.parcelName} (${parcel.type})<br/>
        <b>Sender:</b> ${parcel.senderName}, ${parcel.senderDistrict} <br/>
        <b>Receiver:</b> ${parcel.receiverName}, ${parcel.receiverDistrict} <br/>
        <b>Cost:</b> $${parcel.deliveryCost} <br/>
        <b>Payment:</b> ${parcel.payment_status.toUpperCase()} <br/>
        <b>Delivery Status:</b> ${parcel.delivery_status.replace("_", " ")} <br/>
      `,
      icon: "info",
      showCloseButton: true,
    });
  };

  // Update Parcel (Redirect Example)
  const handleUpdate = (parcel) => {
    navigate(`/updateParcel/${parcel._id}`);
  };
  // handlepayment
  const handlepayment = async(parcel) => {
      const paymentInfo = {
        deliveryCost: parcel.deliveryCost,
        parcelId: parcel._id,
        // customer_email: parcel.created_by,
        created_by: user.email, // login user email
        parcelName: parcel.parcelName,
        trackingId:parcel.trackingId,
    };
    console.log("USER EMAIL:", user.email);
      try {
        const res = await axiosSecure.post(
          "/payment-checkout-session",
          paymentInfo,
        );
        const { url } = res.data;
        window.location.href = url;
      } catch (error) {
        console.error("Payment failed:", error);
      }
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Tracking ID</th>
            <th>Parcel</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Delivery Status</th>
            <th>Creation Time</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <th>{index + 1}</th>
              <td className="font-semibold text-secondary flex items-center gap-2">
                <Link to={`/parcel-track/${parcel.trackingId}`}>
                  {" "}
                  {parcel.tracking_id}
                </Link>
                <button
                  onClick={() => handleCopyTracking(parcel.tracking_id)}
                  className="btn btn-xs btn-outline btn-square p-1"
                  title="Copy Tracking ID"
                >
                  <RiFileCopyLine size={16} />
                </button>
              </td>

              <td>
                <div className="font-bold">{parcel.parcelName}</div>
                <div className="text-xs opacity-60 capitalize">
                  {parcel.type}
                </div>
              </td>

              <td className="font-semibold">{parcel.deliveryCost}</td>
              {/* payment status */}
              <td>
                {parcel.payment_status === "paid" ? (
                  <span className="text-green-500">Paid</span>
                ) : (
                  <button
                    onClick={() => handlepayment(parcel)}
                    className="btn btn-xs btn-primary text-black"
                  >
                    Pay
                  </button>
                  // <Link to={`/dashboard/payment/${parcel._id}`}>

                  // </Link>
                )}
              </td>
              {/* delivery status */}
              <td>{parcel.delivery_status}</td>
              <td>
                {new Date(parcel.creation_date).toLocaleString("en-BD", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>

              <td className="flex  gap-1">
                <button
                  className="btn btn-xs  hover:bg-primary "
                  onClick={() => handleView(parcel)}
                >
                  <RiEyeLine />
                </button>

                <button
                  className="btn btn-xs  hover:bg-primary "
                  onClick={() => handleUpdate(parcel)}
                >
                  <RiEditLine />
                </button>

                <button
                  className="btn btn-xs  hover:bg-primary "
                  onClick={() => handleDelete(parcel._id)}
                >
                  <RiDeleteBinLine />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
