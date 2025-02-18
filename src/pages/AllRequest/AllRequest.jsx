import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DataTable from 'react-data-table-component';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllRequestsPage = () => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['allrequests', search],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/allrequests', { params: { search } });
      return data;
    },
    keepPreviousData: true,
  });

  const approveMutation = useMutation({
    mutationFn: (id) => axiosSecure.put(`/approve-request/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allrequests'] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.put(`/reject-request/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allrequests'] });
    },
  });

  const handleApprove = (id) => {
    approveMutation.mutate(id);
  };

  const handleReject = (id) => {
    rejectMutation.mutate(id);
  };
  const handleSearch = (value) => {
    setSearch(value);
    refetch();
  }

  const columns = [
    {
      name: 'Asset Name',
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: 'Asset Type',
      selector: (row) => row.product_type,
      sortable: true,
    },
    {
      name: 'Requester Email',
      selector: (row) => row.userId,
    },
    {
      name: 'Requester Name',
      selector: (row) => row.displayName,
    },
    {
      name: 'Request Date',
      selector: (row) => row.requestDate,
    },
    {
      name: 'Additional Note',
      selector: (row) => row.additionalNotes || 'N/A',
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      cell: (row) => <span>{row.status}</span>,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleApprove(row._id)}
            className="bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50"
            disabled={row.status !== 'pending'}
          >
            Approve
          </button>
          <button
            onClick={() => handleReject(row._id)}
            className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50"
            disabled={row.status !== 'pending'}
          >
            Reject
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 font-mono">
      <Helmet>
        <title>HR | All Requests</title>
      </Helmet>
      <h1 className="text-2xl text-center uppercase mb-8 font-bold">All Requests</h1>


      <div className="mb-4 md:w-8/12 mx-auto">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="border-2 border-orange-300 px-3 py-2 rounded w-full"
        />
      </div>


      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DataTable
          columns={columns}
          data={requests}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
          noDataComponent={<div>No requests found</div>}
          className="border rounded shadow overflow-x-auto"
        />
      )}
    </div>
  );
};

export default AllRequestsPage;
