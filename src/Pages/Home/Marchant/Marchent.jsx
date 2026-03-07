import React from 'react'
import marchent from '../../../assets/location-merchant.png'

const Marchent = () => {
  return (
    <div
      data-aos="zoom-in-up"
      data-aos-duration="2000"
      data-aos-delay="300"
      data-aos-once="true"
      className=" bg-secondary p-20 bg-no-repeat bg-[url('/src/assets/be-a-merchant-bg.png')]"
    >
      <div
        className="hero-content
       flex-col lg:flex-row-reverse"
      >
        <img src={marchent} className="max-w-sm rounded-lg shadow-2xl" />
        <div className="">
          <h1 className="text-2xl lg:text-4xl  font-extrabold text-base-100">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6 text-accent text-sm">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className=''>
            <button className="btn btn-primary mb-3 text-secondary rounded-full">
              Become a Merchant
            </button>
        
            <button className="btn text-primary btn-outline hover:bg-primary hover:text-secondary ml-5 rounded-full">
              Earn with ZapShift Courier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marchent