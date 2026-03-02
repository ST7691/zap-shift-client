import React from "react";

import { servicesData } from "../../../../public/data/servicesData.js";
import ServiceCard from "./ServiceCard";

const ServicesSection = () => {
  return (
    <section className="py-16 px-4 md:px-10 bg-[#03373D]">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
        <p className="max-w-2xl mx-auto text-[#DADADA]">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
