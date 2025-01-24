import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import useAxiosPublic from "../../hooks/useAxiosPublic";

ChartJS.register(ArcElement, Tooltip, Legend);

const Admin = () => {
  const axiosPublic = useAxiosPublic();
  const [pendingRequests, setPendingRequests] = useState([]);
  const [topRequestedItems, setTopRequestedItems] = useState([]);
  const [limitedStockItems, setLimitedStockItems] = useState([]);
  const [returnableStats, setReturnableStats] = useState({ returnable: 0, nonReturnable: 0 });

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pendingRes = await axiosPublic.get("/pending-requests", { params: { limit: 5 } });
        setPendingRequests(pendingRes.data);

        const topItemsRes = await axiosPublic.get("/top-requested-items", { params: { limit: 4 } });
        setTopRequestedItems(topItemsRes.data);

        const limitedStockRes = await axiosPublic.get("/limited-stock-items", { params: { threshold: 10 } });
        setLimitedStockItems(limitedStockRes.data);

        const statsRes = await axiosPublic.get("/returnable-stats");
        setReturnableStats(statsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Data for Pie Chart
  const pieData = {
    labels: ["Returnable", "Non-Returnable"],
    datasets: [
      {
        label: "Requested Items",
        data: [returnableStats.returnable, returnableStats.nonReturnable],
        backgroundColor: ["#4CAF50", "#FF5722"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">HR Manager Dashboard</h1>

      {/* Pending Requests */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Pending Requests (Max: 5)</h2>
        <ul className="list-disc ml-5">
          {pendingRequests.map((request) => (
            <li key={request._id}>
              {request.product_name} - {request.employee_email}
            </li>
          ))}
        </ul>
      </div>

      {/* Top Requested Items */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Top Most Requested Items (Max: 4)</h2>
        <ul className="list-disc ml-5">
          {topRequestedItems.map((item) => (
            <li key={item._id}>
              {item.product_name} - {item.totalRequests} Requests
            </li>
          ))}
        </ul>
      </div>

      {/* Limited Stock Items */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Limited Stock Items (Quantity &lt; 10)</h2>
        <ul className="list-disc ml-5">
          {limitedStockItems.map((item) => (
            <li key={item._id}>
              {item.product_name} - Quantity: {item.product_quantity}
            </li>
          ))}
        </ul>
      </div>

      {/* Pie Chart for Returnable vs Non-Returnable */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Returnable vs Non-Returnable Items</h2>
        <div className="w-1/2 mx-auto">
          <Pie data={pieData} />
        </div>
      </div>

      {/* Extra Section 1: Recent Employees Added */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Recent Employees Added</h2>
        {/* Fetch and display recent employees */}
        <p>Example Placeholder: Employee details here</p>
      </div>

      {/* Extra Section 2: Upcoming Events */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Upcoming Events</h2>
        {/* Fetch and display upcoming events */}
        <p>Example Placeholder: Event details here</p>
      </div>
    </div>
  );
};

export default Admin;
