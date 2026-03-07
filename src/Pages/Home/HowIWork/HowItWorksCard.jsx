import React from "react";

const HowItWorksCard = ({ item }) => {
  const { icon: Icon, title, description } = item;

  return (
    <div className="card mb-4 bg-base-100 shadow-md hover:shadow-xl transition duration-300 ">
      <div className="items-start ">
        <div className="text-primary text-4xl">
          <Icon />
        </div>
        <h3 className=" text-lg text-secondary font-semibold">{title}</h3>
        <p className="text-sm text-accent">{description}</p>
      </div>
    </div>
  );
};

export default HowItWorksCard;
