import React from "react";

const ServiceCard = ({ service }) => {
  const { title, description, icon: Icon } = service;

  return (
    <div className="card bg-[#FFFFFF] shadow-md hover:shadow-xl transition duration-300 border hover:bg-[#CAEB66] hover:text-black">
      <div className="card-body items-center text-center">
        <div className="text-[#FD8087] text-4xl mb-4">
          <Icon />
        </div>
        <h2 className="card-title text-black text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
