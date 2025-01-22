import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import DataTable from "react-data-table-component";

const MyRequestedAssets = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [assetType, setAssetType] = useState("");
  console.log(search, status, assetType)

  const fetchRequests = async () => {
    try {
      const { data } = await axiosPublic.get("/my-requests", {
        params: { userEmail: user?.email, search, status, assetType },
      });
      setRequests(data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [search, status, assetType]);

  const handleCancel = async (id) => {
    try {
      await axiosPublic.put(`/cancel-request/${id}`);
      fetchRequests();
    } catch (error) {
      console.error("Failed to cancel request:", error);
    }
  };

  const handleReturn = async (id) => {
    try {
      await axiosPublic.put(`/return-asset/${id}`);
      fetchRequests();
    } catch (error) {
      console.error("Failed to return asset:", error);
    }
  };

  const handlePrint = (request) => {
    // Implement print functionality here (e.g., using React-PDF)
  };

  // Define table columns
  const columns = [
    {
      name: "Asset Name",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.product_type,
      sortable: true,
    },
    {
      name: "Request Date",
      selector: (row) => row.requestDate,
    },
    {
      name: "Approval Date",
      selector: (row) => (row.approvalDate ? row.approvalDate : "N/A"),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          {row.status === "pending" && (
            <button
              onClick={() => handleCancel(row._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Cancel
            </button>
          )}
          {row.status === "approved" && (
            <>
              <button
                onClick={() => handlePrint(row)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Print
              </button>
              {row.product_type === "Returnable" && (
                <button
                  onClick={() => handleReturn(row._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Return
                </button>
              )}
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-5 font-mono w-10/12 mx-auto">
      <h1 className="text-2xl text-center uppercase font-bold mb-8">My Requested Assets</h1>

      {/* Search and Filter Section */}
      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="returned">Returned</option>
        </select>
        <select
          value={assetType}
          onChange={(e) => setAssetType(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-Returnable">Non-Returnable</option>
        </select>
      </div>

      {/* Data Table Section */}
      <DataTable
        columns={columns}
        data={requests}
        pagination
        highlightOnHover
        striped
        responsive
        noDataComponent="No requests found"
      />
    </div>
  );
};

export default MyRequestedAssets;
