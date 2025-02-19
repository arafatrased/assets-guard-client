import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [teamMemberCount, setTeamMemberCount] = useState(0);
    const axiosSecure = useAxiosSecure();


    const { data, refetch } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axiosSecure.get("/allemployee");
            return res.data; 
        },
    });

    useEffect(() => {
        if (data) {
            setEmployees(data);
            setTeamMemberCount(data.length);
        }
    }, [data]);


    const handleRemove = (id) => {
        axiosSecure.delete(`/deleteemployee/${id}`).then((res) => {
            toast.success("Employee removed successfully");
            refetch();
        });
         const updatedEmployees = employees.filter((employee) => employee._id !== id);
         setEmployees(updatedEmployees);
         setTeamMemberCount(updatedEmployees.length);
    };
    const modernRemove = id => {
        toast(t => (
          <div className='flex gap-3 items-center'>
            <div>
              <p>
                Want to <b>Remove?</b>
              </p>
            </div>
            <div className='gap-2 flex'>
              <button
                className='bg-red-400 text-white px-3 py-1 rounded-md'
                onClick={() => {
                  toast.dismiss(t.id)
                  handleRemove(id)
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

    const columns = [
        {
            name: "Photo",
            selector: (row) => (
                <img
                    src={row.photoURL || "https://i.ibb.co.com/54Xx1Gc/39653-2011613-updates.webp"}
                    alt={row.name}
                    className="w-12 h-12 rounded-full my-2"
                />
            ),
            sortable: false,
            center: true,
        },
        {
            name: "Name",
            selector: (row) => row.displayName,
            sortable: true,
        },
        {
            name: "Role",
            selector: (row) =>
                row.role === "admin" ? (
                    <span className="text-red-500">👑 Admin</span>
                ) : (
                    <span className="text-blue-500">👔 Employee</span>
                ),
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                row.role === "admin" ? '': <button
                onClick={() => modernRemove(row._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Remove
            </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    // Render loading and error states
    if (!data) return <p>Loading...</p>;

    return (
        <div className="w-11/12 dark:bg-black dark:text-white mx-auto my-5 font-mono">
          <Helmet>
                <title>HR | Employee List</title> 
          </Helmet>
            <h1 className="text-2xl text-center font-bold mb-4 uppercase">Team Members</h1>
            <p className="mb-4 dark:bg-black dark:text-white text-center">Team Member Count: {teamMemberCount}</p>

            <DataTable
                className="overflow-x-auto dark:bg-black dark:text-white"
                title="Employee List"
                columns={columns}
                data={employees}
                pagination
                highlightOnHover
                striped
                responsive
                defaultSortFieldId="Name"
            />
        </div>
    );
};

export default EmployeeList;
