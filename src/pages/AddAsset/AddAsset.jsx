import React, { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const AddAsset = () => {
  const [category, setCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const axiosPublic = useAxiosPublic();

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
        added_time: new Date().toLocaleDateString()
    }
    axiosPublic.post('/addassets', asset)
    .then(res =>{
        console.log(res.data);
        toast.success(`${quantity} ${selectedItem} added successfully`);
    });


  };

  return (
    <div className="flex items-center font-mono justify-center min-h-[70vh] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-8/12 lg:w-6/12  mx-auto"
      >
        <h2 className="text-2xl font-mono font-bold mb-4 text-center uppercase">Add New Asset</h2>

        {/* Category Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Select Category:
          </label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
          >
            <option value="">-- Choose Category --</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-Returnable">Non-Returnable</option>
          </select>
        </div>

        {/* Item Selection */}
        {category && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Select Item:
            </label>
            <select
              value={selectedItem}
              onChange={handleItemChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
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

        {/* Quantity Selection */}
        {selectedItem && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Enter Quantity:
            </label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-outline w-full border-b-4 hover:bg-green-600 border-b-orange-200"
        >
          Add Items
        </button>
      </form>
    </div>
  );
};

export default AddAsset;