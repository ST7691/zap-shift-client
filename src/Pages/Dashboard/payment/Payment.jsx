import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router'
import UseAxiosSecure from '../../hooks/UseAxiosSecure';

const Payment = () => {
    const { parcelId } = useParams();
    const axiosSecure = UseAxiosSecure()
    const {isLoading,data:parcel = [] } = useQuery({
        querykey: ['parcels',parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels${parcelId}`);
            return res.data
        }
    });
    if (isLoading) {
        return <div>
                <span className="loading loading-spinner loading-xl"></span>
              </div>;
    }



  return (
    <div>
      <h2 className="text-5xl">Payment</h2>
          <h3>Please payment : {parcel.parcelName}</h3>
          <button className='btn btn-primary text-black'>Pay</button>
    </div>
  );
}

export default Payment