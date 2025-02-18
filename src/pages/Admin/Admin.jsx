import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

ChartJS.register(ArcElement, Tooltip, Legend);

const Admin = () => {

  const { user } = useAuth()
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()

  const [pendingRequests, setPendingRequests] = useState([]);
  const [topRequestedItems, setTopRequestedItems] = useState([]);
  const [limitedStockItems, setLimitedStockItems] = useState([]);
  const [returnableStats, setReturnableStats] = useState({ returnable: 0, nonReturnable: 0 });


  const { data: recentAdded = [] } = useQuery({
    queryKey: ["recentAdded"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/recent-employees-added");
        return res.data;
      } catch (error) {
        toast.error("Error fetching recent added employees:");
        return [];
      }
    },
  });


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
        toast.error("Error fetching data:");
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
    <div className="p-5 font-mono">
      <Helmet>
        <title>HR Manager Dashboard</title>
      </Helmet>
      {/* <h2 className="text-xl uppercase text-center font-semibold mb-10"><span className="text-green-700">Welcome,</span> <span className="text-orange-700">{user?.displayName}</span></h2> */}

      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-8 bg-gradient-to-r from-white to-green-100 border-2 border-orange-300 p-3 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Pending Requests : (Recent-5)</h2>
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm md:text-base">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 md:px-4 py-2">Asset Name</th>
                <th className="border border-gray-300 px-2 md:px-4 py-2">Requested By (Employee Email)</th>
                <th className="border border-gray-300 px-2 md:px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((request) => (
                <tr key={request._id}>
                  <td className="border border-gray-300 px-2 md:px-4 py-2">{request.product_name}</td>
                  <td className="border border-gray-300 px-2 md:px-4 py-2">{request.userId}</td>
                  <td className="border border-gray-300 px-2 md:px-4 py-2 whitespace-nowrap">{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>


        <div className="mb-8 bg-gradient-to-r from-white to-orange-100 border-2 border-orange-300 p-3 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Top Most Requested Items</h2>
          <ul className="list-disc ml-5">
            {topRequestedItems.map((item) => (
              <li key={item._id}>
                {item._id} - {item.totalRequests} Requests
              </li>
            ))}
          </ul>
        </div>
      </div>


      <div className="mb-8 bg-gradient-to-r from-white to-orange-100 rounded-xl shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-3">Limited Stock Items (Quantity &lt; 10)</h2>
        <ul className="list-disc ml-5">
          {limitedStockItems.map((item) => (
            <li key={item._id}>
              {item.product_name} - Quantity: {item.product_quantity}
            </li>
          ))}
        </ul>
      </div>


      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Returnable vs Non-Returnable Items</h2>
        <div className="w-1/2 mx-auto">
          <Pie data={pieData} />
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-8 bg-gradient-to-r from-white to-orange-100 p-4 border-2 border-green-500 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">Recent Employees Added</h2>

          <p>Employee details here</p>
          {
            recentAdded.map((item) => (

              item.role === "employee" && <div key={item._id} className="border border-gray-300 p-2 my-2 rounded-lg">
                <p><span className="font-semibold">Name:</span> {item.displayName}</p>
                <p><span className="font-semibold">Email:</span> {item.email}</p>
                <p><span className="font-semibold">Role:</span> {item.role}</p>
              </div>

            ))
          }
        </div>

        <div className="mb-8 p-4 bg-gradient-to-r from-white to-green-300 border-2 border-green-500 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">Upcoming Events</h2>

          <ul>
            <li>Team meeting - 25th Jan</li>
            <li>Deadline - 30th Jan</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;
