import React from "react";
import Marquee from "react-fast-marquee";

import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/amazon_vector.png";
import logo3 from "../../../assets/brands/casio.png";
import logo4 from "../../../assets/brands/moonstar.png";
import logo5 from "../../../assets/brands/randstad.png";
import logo6 from "../../../assets/brands/star.png";
import logo7 from "../../../assets/brands/start_people.png";
const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientMarquee = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-secondary">
          Our Trusted Clients
        </h2>
        <p className="text-accent mt-2">Companies that trust our services</p>
      </div>

      <Marquee
        speed={100}
        gradient={false}
        pauseOnHover={true}
        direction="right"
      >
        {logos.map((logo, index) => (
          <div key={index} className="mx-24">
            <img
              src={logo}
              alt="client logo"
              className="h-6 hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default ClientMarquee;
