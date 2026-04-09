import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuth from '../../hooks/useAuth'
import UseAxiosSecure from '../../hooks/UseAxiosSecure'

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure()
    const { data: payments = [], isLoading } = useQuery({
      queryKey: ["payments", user?.email],
      enabled: !!user?.email,
      queryFn: async () => {
        const res = await axiosSecure.get(`/payments?email=${user.email}`);
        return res.data;
      },
    });
    // loading
     if (isLoading) {
       return (
         <div>
           <span className="loading loading-spinner loading-xl"></span>
         </div>
       );
     }
  return (
    <div>
      <h2 className="lg:text-5xl text-2xl">
        Payment History : {payments.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Amount</th>
              <th>TransactionId</th>
              <th>Paid Time</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <th>parcel</th>
                <td>${payment.amount}</td>
                <td>{payment.transactionId}</td>
                <td>{payment.creation_time}</td>
                <td>{payment.customerEmail}</td>
                <td>Blue</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentHistory
