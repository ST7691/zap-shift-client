import Lottie from "lottie-react";
import React from "react";
import error from "../../assets/animations/Error 404 on Laptop.json";
import { Link } from "react-router";

const Forbbiden = () => {
  return (
    <div className=" flex flex-col items-center justify-center h-screen">
      <Lottie animationData={error} loop={false} autoplay={true}></Lottie>
      <h1 className="text-3xl font-bold text-red-500">
        you Are forbidden to access this page.
      </h1>
      <div className=" flex gap-5 mt-5">
        <Link to={"/"}>
          {" "}
          <button className="btn bg-secondary text-primary">Go to Home</button>
        </Link>
        <Link to={"/dashboard/myparcels"}>
          {" "}
          <button className="btn bg-primary">Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default Forbbiden;
