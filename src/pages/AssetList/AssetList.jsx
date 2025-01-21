import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const AssetTable = () => {
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic();
    const [assets, setAssets] = useState([]);
    const { data: queryAssets = [], refetch } = useQuery({
        queryKey: ['assets'],
        queryFn: async () => {
            const res = await axiosPublic.get('/assets');
            return res.data; // Fetch and return the data
        },
    });
    
    useEffect(() => {
        setAssets(queryAssets); // Update local state whenever queryAssets changes
    }, [queryAssets]);


    const [searchText, setSearchText] = useState('');
    const [filterStockStatus, setFilterStockStatus] = useState('');
    const [filterType, setFilterType] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const filteredAssets = assets
    .filter(item => {
        const stockStatus = item.product_quantity === 0 ? 'Out-of-Stock' : 'Available';
        
        return (
            item.product_name.toLowerCase().includes(searchText.toLowerCase()) &&
            (filterStockStatus ? stockStatus === filterStockStatus : true) &&
            (filterType ? item.product_type === filterType : true)
        );
    })
    .sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.product_quantity - b.product_quantity;
        }
        return b.product_quantity - a.product_quantity;
    });

    // const filteredAssets = assets
    //     .filter(item => {
    //         return (
    //             (item.product_name.toLowerCase().includes(searchText.toLowerCase())) &&
    //             (filterStockStatus ? item.stockStatus === filterStockStatus : true) &&
    //             (filterType ? item.product_type === filterType : true)
    //         );
    //     })
    //     .sort((a, b) => {
    //         if (sortOrder === 'asc') {
    //             return a.product_quantity - b.product_quantity;
    //         }
    //         return b.product_quantity - a.product_quantity;
    //     });

    const handleSearch = event => {
        setSearchText(event.target.value);
    };

    const handleStockStatusFilter = event => {
        setFilterStockStatus(event.target.value);
    };

    const handleTypeFilter = event => {
        setFilterType(event.target.value);
    };

    const handleSortChange = () => {
        setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };
     // Delete function
     const handleDelete = (id) => {
        console.log(id);
        axiosPublic.delete(`/deleteasset/${id}`)
        .then(res => {
            refetch();
            toast.success('Asset deleted successfully');
        });
    };

    const modernDelete = id => {
        toast(t => (
          <div className='flex gap-3 items-center'>
            <div>
              <p>
                Are you <b>sure?</b>
              </p>
            </div>
            <div className='gap-2 flex'>
              <button
                className='bg-red-400 text-white px-3 py-1 rounded-md'
                onClick={() => {
                  toast.dismiss(t.id)
                  handleDelete(id)
                }}
              >
                Yes
              </button>
              <button
                className='bg-green-400 text-white px-3 py-1 rounded-md'
                onClick={() => toast.dismiss(t.id)}
              >
                Cancel
              </button>
            </div>
          </div>
        ))
      }
   


    // Update function
    const handleUpdate = (id) => {
        console.log(id);
        navigate(`/updateasset/${id}`);
    };

    const columns = [
        {
            name: 'Serial No.',
            selector: (row, index) => index + 1,
            sortable: false,
        },
        {
            name: 'Product Name',
            selector: row => row.product_name,
            sortable: true,
        },
        {
            name: 'Product Type',
            selector: row => row.product_type,
        },
        {
            name: 'Product Quantity',
            selector: row => row.product_quantity,
            sortable: true,
        },
        {
            name: 'Date Added',
            selector: row => row.added_time,
        },
        {
            name: 'Item Status',
            selector: row => row.product_quantity <= 1 ? 'Out of Stock' : 'Available',
            cell: row => (
                <div
                    className={row.product_quantity <= 1 ? 'text-red-500' : 'text-green-500'}>
                    {row.product_quantity <= 1 ? 'Out of Stock' : 'Available'}
                </div>
            ),
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
                    <button className='mr-2' onClick={() => handleUpdate(row._id)}><FiEdit /></button>
                    <button className='text-red-600' onClick={() => modernDelete(row._id)}><RiDeleteBin2Fill /></button>
                </div>
            ),
        },
    ];

    return (
        <div className='w-11/12 mx-auto my-2 font-mono'>
            <h2 className="text-2xl font-bold font-mono my-4 text-center uppercase">Asset List</h2>
            <div>
                <input
                    className='border-2 p-1 rounded-lg m-1'
                    type="text"
                    placeholder="Search: product name"
                    value={searchText}
                    onChange={handleSearch}
                />
            </div>

            <div >
                <select onChange={handleStockStatusFilter} className='border-2 p-1 rounded-lg m-1' value={filterStockStatus}>
                    <option value="">Filter by Stock Status</option>
                    <option value="Available">Available</option>
                    <option value="Out-of-Stock">Out-of-Stock</option>
                </select>

                <select onChange={handleTypeFilter} className='border-2 p-1 rounded-lg m-1' value={filterType}>
                    <option value="">Filter by Type</option>
                    <option value="Returnable">Returnable</option>
                    <option value="Non-Returnable">Non-Returnable</option>
                </select>

                <button onClick={handleSortChange} className='border-2 p-1 rounded-lg m-1'>
                    Sort by Quantity ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
                </button>
            </div>

            <DataTable
                columns={columns}
                data={filteredAssets}
                pagination
            />
        </div>
    );
};

export default AssetTable;
