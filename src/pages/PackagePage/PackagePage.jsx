import React from "react";

import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PackagePage = () => {
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic();

  // Package options
  const packages = [
    { members: 5, price: 5 },
    { members: 10, price: 8 },
    { members: 20, price: 15 },
  ];

  // Function to handle the package purchase
  const handlePackagePurchase = async (members) => {
    try {
      const res = await axiosPublic.post("/update-package", { newLimit: members });
      if (res.status === 200) {
        toast.success(`Successfully purchased package for ${members} members!`);
        navigate("/admin/addemployee"); // Redirect to employee page after purchase
      } else {
        alert("Failed to purchase the package. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while purchasing the package.");
    }
  };

  return (
    <div className="w-11/12 mx-auto my-5 font-mono">
      <h1 className="text-2xl text-center font-bold mb-4 uppercase">Choose a Package</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div key={pkg.members} className="border rounded-lg p-4 shadow-lg text-center">
            <h2 className="text-xl font-semibold">{pkg.members} Members</h2>
            <p className="text-gray-500 mb-4">${pkg.price} per month</p>
            <button
              onClick={() => handlePackagePurchase(pkg.members)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackagePage;
