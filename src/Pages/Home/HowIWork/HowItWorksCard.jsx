import React from "react";

const HowItWorksCard = ({ item }) => {
  const { icon: Icon, title, description } = item;

  return (
    <div className="card items-start bg-white shadow-md hover:shadow-xl transition duration-300 border">
      <div className="card-body ">
        <div className="text-primary items-center text-center text-4xl mb-4">
          <Icon />
        </div>
        <h3 className="card-title text-lg text-black font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default HowItWorksCard;
