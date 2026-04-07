import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = UseAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);
  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
          });
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div>
      <h2 className="lg:text-5xl text-2xl">Payment successful</h2>
      <h3 >your transaction id : { paymentInfo.transactionId}</h3>
    </div>
  );
};
