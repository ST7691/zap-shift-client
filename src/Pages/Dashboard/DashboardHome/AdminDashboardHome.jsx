import { useQuery } from "@tanstack/react-query";

import React from "react";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { Legend, Pie, PieChart, Tooltip } from "recharts";


const AdminDashboardHome = () => {
  const axiosSecoure = UseAxiosSecure();
  const { data: deliveryStats = [] } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecoure.get("/parcels/delivery_status/stats");
      return res.data;
    },
  });
  // pichart handle
  const getPichatData = (data) => {
    return data.map((item) => {
      return { name: item.status, value: item.count };
    });
  };
  return (
    <div>
      <h2 className="lg:text-4xl text-2xl">Admin deshing Desh</h2>
      {/* stats */}
      <div className="stats shadow">
        {deliveryStats.map((stat) => (
          <div className="stat">
            <div key={stat._id} className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-xl ">{stat._id}</div>
            <div className="stat-value">{stat.count}</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>
        ))}
      </div>
      {/* pi chart to recharts */}
      <div className="w-full h-[400px]">
        <PieChart
          style={{
            width: "100%",
            maxWidth: "500px",
            maxHeight: "80vh",
            aspectRatio: 2,
          }}
          responsive
        >
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={getPichatData(deliveryStats)}
            cx="50%"
            cy="100%"
            outerRadius="120%"
            fill="#8884d8"
            label
            isAnimationActive={true}
                  />
                  <Legend></Legend>
                  <Tooltip></Tooltip>
        </PieChart>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
