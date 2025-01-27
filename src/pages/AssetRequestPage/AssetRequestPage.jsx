import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const AssetRequestPage = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic();
    const [searchText, setSearchText] = useState('');
    const [filterAvailability, setFilterAvailability] = useState('');
    const [filterType, setFilterType] = useState('');
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [additionalNotes, setAdditionalNotes] = useState('');

  
    const { data: assets = [], refetch } = useQuery({
        queryKey: ['assets', searchText, filterAvailability, filterType],
        queryFn: async () => {
            const res = await axiosPublic.get('/assetsrequest', {
                params: {
                    name: searchText,
                    availability: filterAvailability,
                    type: filterType,
                },
            });
            return res.data;
        },
    });

    // Handle request submission
    const handleRequest = () => {
        const userId = user?.email;
        const displayName = user?.displayName;
        axiosPublic.post('/request-asset', {
            assetId: selectedAsset._id,
            userId,
            displayName,
            product_name: selectedAsset.product_name,
            product_type: selectedAsset.product_type,
            additionalNotes,
        }).then(res => {
            toast.success('Request submitted successfully!')
            setSelectedAsset(null);
            setAdditionalNotes('');
            refetch();
        }).catch(err => {
            toast.error('Failed to submit request. Please try again.');
        })
    };

    return (
        <div className="w-11/12 mx-auto my-5 font-mono">
            <Helmet>
                <title>Employee | Asset Request</title>
            </Helmet>
            <h1 className="text-2xl text-center font-bold mb-6 uppercase">Request an Asset</h1>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row justify-between mb-6">
                <input
                    type="text"
                    placeholder="Search by asset name"
                    className="border px-4 py-2 rounded w-full md:w-1/3"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                <select
                    className="border px-4 py-2 rounded w-full md:w-1/4 mt-4 md:mt-0"
                    onChange={(e) => setFilterAvailability(e.target.value)}
                >
                    <option value="">Filter by Availability</option>
                    <option value="available">Available</option>
                    <option value="out-of-stock">Out of Stock</option>
                </select>

                <select
                    className="border px-4 py-2 rounded w-full md:w-1/4 mt-4 md:mt-0"
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="">Filter by Type</option>
                    <option value="Returnable">Returnable</option>
                    <option value="Non-Returnable">Non-Returnable</option>
                </select>
            </div>

            {/* Assets List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assets.map((asset) => (
                    <div
                        key={asset._id}
                        className="border rounded-lg p-4 shadow-lg flex flex-col items-center"
                    >
                        <h2 className="text-xl font-semibold">{asset.product_name}</h2>
                        <p className="text-gray-500">
                            Type: {asset.product_type}
                        </p>
                        <p
                            className={
                                asset.product_quantity > 0
                                    ? 'text-green-500'
                                    : 'text-red-500'
                            }
                        >
                            {asset.product_quantity > 0
                                ? 'Available'
                                : 'Out of Stock'}
                        </p>
                        <h2 className="font-semibold">Available Quantity: {asset.product_quantity}</h2>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
                            disabled={asset.product_quantity === 0}
                            onClick={() => setSelectedAsset(asset)}
                        >
                            Request
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedAsset && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <h2 className="text-xl font-semibold mb-4">
                            Request {selectedAsset.product_name}
                        </h2>
                        <textarea
                            placeholder="Add additional notes (optional)"
                            className="border px-4 py-2 rounded w-full mb-4"
                            value={additionalNotes}
                            onChange={(e) => setAdditionalNotes(e.target.value)}
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                onClick={() => setSelectedAsset(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleRequest}
                            >
                                Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssetRequestPage;