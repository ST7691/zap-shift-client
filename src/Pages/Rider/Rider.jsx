import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import { useLoaderData } from "react-router";
import rider from "../../assets/agent-pending.png";
import Swal from "sweetalert2";

const Rider = () => {
  const { register, handleSubmit, } = useForm();
  const axiosSecure = UseAxiosSecure();
  const servicesCenters = useLoaderData();
  // Unique Regions
  const uniqueRegions = [...new Set(servicesCenters.map((w) => w.region))];

  // Selected sender/receiver regions for dynamic districts
  const [selectedSenderRegion, setSelectedSenderRegion] = useState("");

  // Get districts by region
  const getDistrictsByRegion = (region) =>
    servicesCenters.filter((w) => w.region === region).map((w) => w.district);
  // handle rider ---------------------------
  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        // alert
        Swal.fire({
          position: "top",
          icon: "success",
          title:
            "Your application has beeen submited . please wait 30 days later",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      //   console.log('rider insert ', res.data)
    });
  };
  return (
    <div className="mb-5">
      {/* rider heading */}
      <div className="w-[630px]">
        {" "}
        <h2 className="lg:text-5xl text-2xl  text-left">Be a Rider</h2>
        <p className="text-base text-accent  text-left">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      {/* form  react hook*/}

      <form
        onSubmit={handleSubmit(handleRiderApplication)}
        className="space-y-10"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {/*your Tell us about yourself*/}
          <div className="card bg-base-100 shadow-md p-6 space-y-4">
            <h2 className="text-xl text-left font-semibold mb-4">
              Tell us about yourself
            </h2>

            {/*Your Name */}
            <label className="block font-medium mb-2 text-left">
              Your Name
            </label>
            <input
              type="text"
              placeholder=" Your Name"
              className="input input-bordered w-full"
              {...register("name", { required: true })}
            />

            {/* Driving License Number */}
            <label className="block font-medium mb-2 text-left">
              Driving License Number
            </label>
            <input
              type="text"
              placeholder="Driving License Number"
              className="input input-bordered w-full"
              {...register("DrivingLicenseNumber", { required: true })}
            />
            {/*Your Email */}
            <label className="block font-medium mb-2 text-left">
              Your Email
            </label>
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
              {...register("email", { required: true })}
            />

            {/* Your Region */}
            <label className="block font-medium mb-2 text-left">
              Your Region
            </label>
            <select
              className="select select-bordered w-full"
              {...register("YourRegion", { required: true })}
              onChange={(e) => setSelectedSenderRegion(e.target.value)}
            >
              <option value="">Select Region</option>
              {uniqueRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>

            {/*youre District */}
            <label className="block font-medium mb-2 text-left">District</label>
            <select
              className="select select-bordered w-full"
              {...register("District", { required: true })}
            >
              <option value="">Select District</option>
              {getDistrictsByRegion(selectedSenderRegion).map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            {/*Your Address */}
            <label className="block font-medium mb-2 text-left">
              Your Address
            </label>
            <input
              type="text"
              placeholder="Your Address"
              className="input input-bordered w-full"
              {...register("YourAddress", { required: true })}
            />
            {/*YourNID No */}
            <label className="block font-medium mb-2 text-left">NID No</label>
            <input
              type="text"
              placeholder="NID No"
              className="input input-bordered w-full"
              {...register("NIDNo", { required: true })}
            />
            {/*Phone Number */}
            <label className="block font-medium mb-2 text-left">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full"
              {...register("PhoneNumber", { required: true })}
            />
            {/*Bike Brand Model and Year */}
            <label className="block font-medium mb-2 text-left">
              Bike Brand Model and Year
            </label>
            <input
              type="text"
              placeholder="Bike Brand Model and Year"
              className="input input-bordered w-full"
              {...register("BikeBrand", { required: true })}
            />
            {/*Bike Registration Number */}
            <label className="block font-medium mb-2 text-left">
              Bike Registration Number
            </label>
            <input
              type="text"
              placeholder="Bike Registration Number"
              className="input input-bordered w-full"
              {...register("BikeRegistration", { required: true })}
            />

            {/* Tell Us About Yourself*/}
            <label className="block font-medium mb-2 text-left">
              Tell Us About Yourself
            </label>
            <textarea
              placeholder="Tell Us About Yourself..."
              className="textarea textarea-bordered w-full"
              {...register("Yourself", { required: true })}
            />
            {/* Submit Button Left Align */}
            <div className="flex justify-center mt-4">
              <button className="btn btn-primary text-secondary">Submit</button>
            </div>
          </div>
          {/* rider image----------- */}
          <div className="card bg-base-100 shadow-md p-6 space-y-4">
            <img src={rider} alt="" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Rider;
