import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import DataTable from "react-data-table-component";
import { PDFDownloadLink } from '@react-pdf/renderer';
import AssetPrintDocument from '../../utilities/AssetPrintDocument';
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const MyRequestedAssets = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [assetType, setAssetType] = useState("");

  const fetchRequests = async () => {
    try {
      const { data } = await axiosPublic.get("/my-requests", {
        params: { userEmail: user?.email, search, status, assetType },
      });
      setRequests(data);
    } catch (error) {
      toast.error("Failed to fetch requests:");
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
      toast.error("Failed to cancel request:");
    }
  };

  const handleReturn = async (id) => {
    try {
      await axiosPublic.put(`/return-asset/${id}`);
      fetchRequests();
    } catch (error) {
      toast.error("Failed to return asset:");
    }
  };

  const handlePrint = (request) => {
    return (
      <PDFDownloadLink
        document={<AssetPrintDocument key={request._id} request={request} />}
        fileName={`Asset_Request_${request.product_name}.pdf`}
      >
        {({ loading }) => (loading ? 'Preparing PDF...' : 'Download PDF')}
      </PDFDownloadLink>
    );
  };

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
    <div className="p-5 font-mono min-h-screen w-11/12 mx-auto">
      <Helmet>
        <title>Employee | My Requested Assets</title>
      </Helmet>
      <h1 className="text-2xl text-center uppercase font-bold mb-8">My Requested Assets</h1>


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
