import React from "react";
import trackingImg from "../../../assets/live-tracking.png";
import safeDeliveryImg from "../../../assets/safe-delivery.png";
import callCenterImg from "../../../assets/live-tracking.png";
import FeatureCard from "./FeatureCard";
import Divider from "../divider/Divider";

const features = [
  {
    image: trackingImg,
   
    title: "Live Parcel Tracking",
    description:
      "Track your parcel in real-time from pickup to delivery with our advanced tracking system for complete peace of mind.",
  },
  {
    image: safeDeliveryImg,
   
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    image: callCenterImg,
    title: "Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

const TrackingSection = () => {
    return (
        <section className="py-10 px-6 md:px-10 bg-base-200">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            image={feature.image}
            title={feature.title}
            description={feature.description}
          ></FeatureCard>
        ))}
      </div>
    </section>
  );
};

export default TrackingSection;
