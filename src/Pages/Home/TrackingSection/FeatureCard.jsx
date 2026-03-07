import React from "react";
import divider from "../../../assets/line-divider.png";

const FeatureCard = ({ image, title, description }) => {
  return (
    <div className="flex flex-col md:flex-row  p-[32px] gap-5 sm:flex-row justify-between items-center bg-base-100 shadow-md hover:shadow-xl rounded-lg overflow-hidden transition duration-300">
      {/* Image */}
      <div className="md:w-1/3 flex justify-center p-4 bg-gray-50">
        <img
          src={image}
          alt={title}
          className="h-32 md:h-40 w-auto object-contain"
        />
      </div>

      {/* Divider */}
      <div className=" p-6 text-left">
        <img src={divider} alt="divider" className="" />
      </div>
      {/* Title */}
      <div className="">
        <h3 className="text-xl text-secondary font-semibold mb-2">{title}</h3>
        {/* Description */}
        <p className=" text-sm text-accent">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
