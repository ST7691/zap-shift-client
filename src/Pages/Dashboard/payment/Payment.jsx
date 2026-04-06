import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router'
import UseAxiosSecure from '../../hooks/UseAxiosSecure';

const Payment = () => {
    const { parcelId } = useParams();
    const axiosSecure = UseAxiosSecure()
    const { isLoading, data: parcel = {} } = useQuery({
      queryKey: ["parcels", parcelId],
      queryFn: async () => {
        const res = await axiosSecure.get(`/parcels/${parcelId}`);
        return res.data;
      },
    });
  
  // handle payment 
  const handlePayment = async() => {
  const paymentInfo = {
    deliveryCost: parcel.deliveryCost, 
    parcelId: parcel._id,
    customer_email: parcel.created_by, 
    parcelName: parcel.parcelName,
  };
    try {
      const res = await axiosSecure.post("/create-checkout-session", paymentInfo,);
      const { url } = res.data;
      window.location.href = url;
    } catch (error) {
      console.error("Payment failed:", error);
    }
  }
    if (isLoading) {
        return <div>
                <span className="loading loading-spinner loading-xl"></span>
              </div>;
    }



  return (
    <div>
      <h2 className="lg:text-5xl text-2xl">Payment</h2>
      <h3>
        Please pay for ${parcel.deliveryCost} : {parcel.parcelName}
      </h3>
      <button onClick={handlePayment} className="btn btn-primary text-black">Pay</button>
    </div>
  );
}

export default Payment