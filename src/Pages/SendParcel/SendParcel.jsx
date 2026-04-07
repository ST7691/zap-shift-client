import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
// tracking id
const generateTrackingID = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(10000 + Math.random() * 90000);
  return `ZP-${date}-${random}`;
};
const SendParcel = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const servicesCenters = useLoaderData();

  // Unique Regions
  const uniqueRegions = [...new Set(servicesCenters.map((w) => w.region))];

  // Parcel Type watch
  const parcelType = watch("type");

  // Selected sender/receiver regions for dynamic districts
  const [selectedSenderRegion, setSelectedSenderRegion] = useState("");
  const [selectedReceiverRegion, setSelectedReceiverRegion] = useState("");

  // Get districts by region
  const getDistrictsByRegion = (region) =>
    servicesCenters.filter((w) => w.region === region).map((w) => w.district);
  // cost calculation
  // const calculateCost = (data) => {
  //   let cost = 0;
  //   const location = data.deliveryLocation; // "within" or "outside"

  //   if (data.type === "document") {
  //     cost = location === "within" ? 60 : 80;
  //   } else {
  //     // Non-Document
  //     const weight = Number(data.weight || 0);
  //     if (weight <= 3) {
  //       cost = location === "within" ? 110 : 150;
  //     } else {
  //       // > 3kg
  //       const extraKg = weight - 3;
  //       if (location === "within") {
  //         cost = 110 + extraKg * 40;
  //       } else {
  //         cost = 150 + extraKg * 40 + 40; // extra 40 for outside city/district
  //       }
  //     }
  //   }

  //   return cost;
  // };
  // Form submit
  const onSubmit = (data) => {
    const location = data.deliveryLocation;
    let baseCost = 0;
    let extraCost = 0;
    let costBreakdown = "";

    // Pricing Calculation
    if (data.type === "document") {
      baseCost = location === "within" ? 60 : 80;

      costBreakdown = `
      <b>📦 Parcel Type:</b> Document <br/>
      <p>📍 Delivery Location:</p> ${
        location === "within" ? "Within City" : "Outside City/District"
      } <br/>
      <p>💰 Base Cost:</p> $${baseCost}
    `;
    } else {
      const weight = Number(data.weight || 0);

      if (weight <= 3) {
        baseCost = location === "within" ? 110 : 150;

        costBreakdown = `
        <b>📦 Parcel Type:</b> Non-Document <br/>
        <p>⚖️ Weight:</p> ${weight} kg <br/>
        <p>📍 Delivery Location:</p> ${
          location === "within" ? "Within City" : "Outside City/District"
        } <br/>
        <p>💰 Base Cost:</p> $${baseCost}
      `;
      } else {
        const extraKg = weight - 3;

        if (location === "within") {
          baseCost = 110;
          extraCost = extraKg * 40;
        } else {
          baseCost = 150;
          extraCost = extraKg * 40 + 40;
        }

        costBreakdown = `
        <b>📦 Parcel Type:</b> Non-Document <br/>
        <p>⚖️ Weight:</p> ${weight} kg <br/>
        <p>📍 Delivery Location:</p> ${
          location === "within" ? "Within City" : "Outside City/District"
        } <br/>
        <p>💰 Base Cost :</p> $${baseCost} <br/>
        <p>➕ Extra Weight Cost (extraKg * 40 + 40):</p> $${extraCost}
      `;
      }
    }

    const totalCost = baseCost + extraCost;

    Swal.fire({
      title: `<strong>📊 Parcel Delivery Cost Breakdown</strong>`,
      html: `
      ${costBreakdown}
      <hr/>
      <h2 style="color:green">Total Cost:$ ${totalCost}</h2>
    `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "💳 Proceed to Payment",
      cancelButtonText: "✏️ Edit Parcel",
      width: "500px",
    }).then((result) => {
   if (result.isConfirmed) {
     // Final Parcel Object
     const parcelData = {
       ...data,
       deliveryCost: totalCost,
       created_by: user?.email,
       creation_date: new Date().toISOString(),
       payment_status: "unpaid",
       delivery_status: "not_collected",
       tracking_id: generateTrackingID(),
     };

     console.log(parcelData);

     // save to database
     axiosSecure
       .post("/parcels", parcelData)
       .then((res) => {
         if (res.data.insertedId) {
           navigate("/dashboard/myparcels");
           Swal.fire({
             icon: "success",
             title: "📦 Parcel Created Successfully",
             html: `
            <p>Your parcel request has been submitted.</p>
            <b>Tracking ID</b>
            <h2 style="color:green">${parcelData.tracking_id}</h2>
          `,
             confirmButtonText: "OK",
           });

           // reset form after success
           reset();
           setSelectedSenderRegion("");
           setSelectedReceiverRegion("");
         }
       })
       .catch((error) => {
         Swal.fire({
           icon: "error",
           title: "❌ Failed to create parcel",
           text: "Please try again later",
         });

         console.log(error);
       });
   } else {
     Swal.fire({
       icon: "info",
       title: "✏️ You can edit your parcel details",
     });
   }
    });
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold">Send a Parcel</h1>
        <p className="text-secondary font-bold mt-2">
          Enter your parcel details
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Parcel Info */}
        <div className="card bg-base-100 shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Parcel Info</h2>

          {/* Parcel Type */}
          <div className="form-control mb-4">
            <label className="block font-medium mb-2 text-left">
              Parcel Type
            </label>
            <div className="flex gap-6">
              <label className="label cursor-pointer gap-2">
                <input
                  type="radio"
                  value="document"
                  className="radio radio-primary"
                  {...register("type", { required: true })}
                />
                Document
              </label>
              <label className="label cursor-pointer gap-2">
                <input
                  type="radio"
                  value="non-document"
                  className="radio radio-primary"
                  {...register("type", { required: true })}
                />
                Non Document
              </label>
            </div>
          </div>

          {/* Parcel Name */}
          <div className="form-control mb-4">
            <label className="block font-medium mb-2 text-left">
              Parcel Name
            </label>
            <input
              type="text"
              placeholder="Enter parcel name"
              className="input input-bordered w-full"
              {...register("parcelName", { required: true })}
            />
          </div>

          {/* Parcel Weight */}
          {parcelType === "non-document" && (
            <div className="form-control mb-4">
              <label className="block font-medium mb-2 text-left">
                Parcel Weight (kg)
              </label>
              <input
                type="number"
                placeholder="Enter parcel weight"
                className="input input-bordered w-full"
                {...register("weight")}
              />
            </div>
          )}
        </div>

        {/* Sender & Receiver Side by Side */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Sender Info */}
          <div className="card bg-base-100 shadow-md p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Sender Info</h2>

            {/* Sender Name */}
            <label className="block font-medium mb-2 text-left">
              Sender Name
            </label>
            <input
              type="text"
              placeholder="Sender Name"
              className="input input-bordered w-full"
              {...register("senderName", { required: true })}
            />

            {/* Sender Contact */}
            <label className="block font-medium mb-2 text-left">
              Sender Contact
            </label>
            <input
              type="text"
              placeholder="Sender Contact"
              className="input input-bordered w-full"
              {...register("senderContact", { required: true })}
            />

            {/* Sender Region */}
            <label className="block font-medium mb-2 text-left">Region</label>
            <select
              className="select select-bordered w-full"
              {...register("senderRegion", { required: true })}
              onChange={(e) => setSelectedSenderRegion(e.target.value)}
            >
              <option value="">Select Region</option>
              {uniqueRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>

            {/* Sender District */}
            <label className="block font-medium mb-2 text-left">District</label>
            <select
              className="select select-bordered w-full"
              {...register("senderDistrict", { required: true })}
            >
              <option value="">Select District</option>
              {getDistrictsByRegion(selectedSenderRegion).map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>

            {/* Sender Address */}
            <label className="block font-medium mb-2 text-left">Address</label>
            <input
              type="text"
              placeholder="Address"
              className="input input-bordered w-full"
              {...register("senderAddress", { required: true })}
            />

            {/* Pickup Instruction */}
            <label className="block font-medium mb-2 text-left">
              Pickup Instruction
            </label>
            <textarea
              placeholder="Pickup Instruction..."
              className="textarea textarea-bordered w-full"
              {...register("senderInstruction", { required: true })}
            />
          </div>

          {/* Receiver Info */}
          <div className="card bg-base-100 shadow-md p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Receiver Info</h2>

            {/* Receiver Name */}
            <label className="block font-medium mb-2 text-left">
              Receiver Name
            </label>
            <input
              type="text"
              placeholder="Receiver Name"
              className="input input-bordered w-full"
              {...register("receiverName", { required: true })}
            />

            {/* Receiver Contact */}
            <label className="block font-medium mb-2 text-left">
              Receiver Contact
            </label>
            <input
              type="text"
              placeholder="Receiver Contact"
              className="input input-bordered w-full"
              {...register("receiverContact", { required: true })}
            />

            {/* Receiver Region */}
            <label className="block font-medium mb-2 text-left">Region</label>
            <select
              className="select select-bordered w-full"
              {...register("receiverRegion", { required: true })}
              onChange={(e) => setSelectedReceiverRegion(e.target.value)}
            >
              <option value="">Select Region</option>
              {uniqueRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>

            {/* Receiver District */}
            <label className="block font-medium mb-2 text-left">District</label>
            <select
              className="select select-bordered w-full"
              {...register("receiverDistrict", { required: true })}
            >
              <option value="">Select District</option>
              {getDistrictsByRegion(selectedReceiverRegion).map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>

            {/* Delivery Address */}
            <label className="block font-medium mb-2 text-left">
              Delivery Address
            </label>
            <input
              type="text"
              placeholder="Delivery Address"
              className="input input-bordered w-full"
              {...register("receiverAddress", { required: true })}
            />

            {/* Delivery Instruction */}
            <label className="block font-medium mb-2 text-left">
              Delivery Instruction
            </label>
            <textarea
              placeholder="Delivery Instruction..."
              className="textarea textarea-bordered w-full"
              {...register("receiverInstruction", { required: true })}
            />
          </div>
        </div>

        {/* Submit Button Left Align */}
        <div className="flex justify-start mt-4">
          <button className="btn btn-primary text-secondary">
            Proceed to Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
