import React from "react";
import {howItWorksData} from "../../../../public/data/workData.js";
import HowItWorksCard from "./HowItWorksCard.jsx";


const HowItWorks = () => {
  return (
    <section className="py-5 px-4 md:px-10 bg-[#FFFFFF]">
      <div className=" mb-12">
        <h2 className="text-3xl text-black md:text-4xl font-bold mb-4">How It Works</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {howItWorksData.map((item, index) => (
          <HowItWorksCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
