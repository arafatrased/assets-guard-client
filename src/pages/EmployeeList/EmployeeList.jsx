import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [teamMemberCount, setTeamMemberCount] = useState(0);
    const axiosPublic = useAxiosPublic();


    const { data, refetch } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axiosPublic.get("/allemployee");
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
        console.log(id)
        // const updatedEmployees = employees.filter((employee) => employee._id !== id);
        // setEmployees(updatedEmployees);
        // setTeamMemberCount(updatedEmployees.length);
    };

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
                <button
                    onClick={() => handleRemove(row._id)}
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
        <div className="w-10/12 mx-auto my-5 font-mono">
            <h1 className="text-2xl text-center font-bold mb-4 uppercase">Team Members</h1>
            <p className="mb-4 text-center">Team Member Count: {teamMemberCount}</p>

            <DataTable
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
