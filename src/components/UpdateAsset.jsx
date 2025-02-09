import React, { useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useLoaderData, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const UpdateAsset = () => {
    const updateAsset = useLoaderData();
    const navigate = useNavigate();
    const [category, setCategory] = useState("");
    const [selectedItem, setSelectedItem] = useState("");
    const [quantity, setQuantity] = useState(1);
    const axiosPublic = useAxiosPublic();
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

    const returnableItems = ["Laptop", "Keyboard", "Mouse", "Chair", "Mobile", "Desk"];
    const nonReturnableItems = ["Pen", "Pencil", "Paper", "Diary", "Tissue", "Rubber"];
    
    const handleUpadate = (e) => {
        e.preventDefault();
        const form = e.target;
        const product_type = form.product_type.value;
        const product_name = form.product_name.value;
        const product_quantity = parseInt(form.quantity.value);
        const added_time = new Date()
        const UpdatedAsset = {
            product_type,
            product_name,
            product_quantity,
            added_time
        }
        axiosPublic.put(`/updateasset/${updateAsset._id}`, UpdatedAsset)
            .then(response => {
                toast.success("Asset Updated Successfully");
                navigate(-1);
            })
            .catch(error => {
                toast.error("Failed to Update Asset")
            })
    }
    return (
        <div className="flex items-center font-mono justify-center min-h-[70vh] bg-gray-100">
            <form
                onSubmit={handleUpadate}
                className="bg-white p-6 rounded-lg shadow-lg w-8/12 lg:w-6/12  mx-auto"
            >
                <h2 className="text-2xl font-mono font-bold mb-4 text-center uppercase">Update this Asset</h2>

                {/* Category Selection */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Select Category:
                    </label>
                    <select
                        defaultValue={updateAsset.product_type}
                        name="product_type"
                        onChange={handleCategoryChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
                    >
                        <option value="">-- Choose Category --</option>
                        <option value="Returnable">Returnable</option>
                        <option value="Non-Returnable">Non-Returnable</option>
                    </select>
                </div>

                {/* Item Selection */}
                {(
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Select Item:
                        </label>
                        <select
                            defaultValue={updateAsset.product_name}
                            onChange={handleItemChange}
                            name="product_name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
                        >
                            <option value="">-- Choose Item --</option>
                            {updateAsset.product_type === "Returnable"
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
                {(
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Enter Quantity:
                        </label>
                        <input
                            name="quantity"
                            type="number"
                            defaultValue={updateAsset.product_quantity}
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
                    Update Asset
                </button>
            </form>
        </div>
    );
};

export default UpdateAsset;