import React, { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddAsset = () => {
  const [category, setCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const axiosSecure = useAxiosSecure();

  const returnableItems = ["Laptop", "Keyboard", "Mouse", "Chair", "Mobile", "Desk"];
  const nonReturnableItems = ["Pen", "Pencil", "Paper", "Diary","Tissue", "Rubber"];

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSelectedItem(""); // Reset selected item when category changes
    setQuantity(1); // Reset quantity when category changes
  };

  const handleItemChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const asset = {
        product_type: category,
        product_name: selectedItem,
        product_quantity: quantity,
        added_time: new Date()
    }
    axiosSecure.post('/addassets', asset)
    .then(res =>{
        toast.success(`${quantity} ${selectedItem} added successfully`);
    });


  };

  return (
    <div className="flex items-center dark:bg-black dark:text-white font-mono justify-center mt-8 bg-gray-100">
      <Helmet>
        <title>HR | Add Asset</title>
      </Helmet>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 dark:bg-black dark:text-white rounded-lg shadow-lg w-11/12 lg:w-11/12 mx-auto"
      >
        <h2 className="text-2xl font-mono dark:bg-black dark:text-white font-bold mb-4 text-center uppercase">Add New Asset</h2>

        {/* Category  */}
        <div className="mb-4 dark:bg-black dark:text-white">
          <label className="block dark:bg-black dark:text-white text-gray-700 font-medium mb-2">
            Select Category:
          </label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full dark:bg-black dark:text-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
          >
            <option value="">-- Choose Category --</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-Returnable">Non-Returnable</option>
          </select>
        </div>

        {/* Item*/}
        {category && (
          <div className="mb-4">
            <label className="block text-gray-700 dark:bg-black dark:text-white font-medium mb-2">
              Select Item:
            </label>
            <select
              value={selectedItem}
              onChange={handleItemChange}
              className="w-full px-3 dark:bg-black dark:text-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
            >
              <option value="">-- Choose Item --</option>
              {category === "Returnable"
                ? returnableItems.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))
                : nonReturnableItems.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
            </select>
          </div>
        )}

        {/* Quantity*/}
        {selectedItem && (
          <div className="mb-4">
            <label className="block dark:bg-black dark:text-white text-gray-700 font-medium mb-2">
              Enter Quantity:
            </label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="w-full dark:bg-black dark:text-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
        )}

        <button
          type="submit"
          className="btn btn-outline dark:bg-black dark:text-white w-full border-b-4 hover:bg-green-600 border-b-orange-200"
        >
          Add Items
        </button>
      </form>
    </div>
  );
};

export default AddAsset;