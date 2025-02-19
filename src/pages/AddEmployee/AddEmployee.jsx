import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import DataTable from "react-data-table-component";
import { useLoaderData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddEmployee = () => {
  const { user } = useAuth();
  const packageLimit = useLoaderData();
  const [employees, setEmployees] = useState([]);
  const [teamMemberCount, setTeamMemberCount] = useState(0);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();


  const { data, refetch } = useQuery({
    queryKey: ["unaffiliatedEmployees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/unaffiliated-employees");
      return res.data;
    },
  });
  const { data: currentUser, } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosPublic.get(`/users?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    axiosSecure.get('/allemployee').then(res => {
      setTeamMemberCount(res.data.length)
    })
  }, [currentUser]);


  useEffect(() => {
    if (data) {
      setEmployees(data);
      setTeamMemberCount(data.length);
    }
  }, [data]);


  const handleAddToTeam = () => {
    const updatedEmployees = employees.filter((employee) =>
      selectedEmployees.includes(employee._id)
    );
    if (updatedEmployees.length + teamMemberCount > packageLimit.limit) {
      toast.error("You have reached the package limit. Please upgrade your package to add more team members.");
      setSelectedEmployees([])
      setEmployees((prevState) =>
        prevState.filter((employee) => !selectedEmployees.includes(employee._id))
      );
    };
    setTeamMemberCount(teamMemberCount + selectedEmployees.length);


    const updateUser = {
      emails: updatedEmployees.map(item => item.email), 
      companyName: currentUser.companyName,
      role: 'employee',
      companyLogo: currentUser.companyLogo,
    }

    axiosSecure.post('/update-users', updateUser)
      .then(res => {
        toast.success("Employee added successfully");
      })
    
    setEmployees((prevState) =>
      prevState.filter((employee) => !selectedEmployees.includes(employee._id))
    );
    setSelectedEmployees([]);
    refetch()
  };


  const handleSelectEmployee = (id) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((employeeId) => employeeId !== id)
        : [...prevSelected, id]
    );
  };


  const handleIncreaseLimit = () => {
    navigate("/packages");
  };


  const columns = [
    {
      name: "Select",
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedEmployees.includes(row._id)}
          onChange={() => handleSelectEmployee(row._id)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: false,
    },
    {
      name: "Photo",
      selector: (row) => (
        <img
          src={row.photoURL || "https://i.ibb.co.com/54Xx1Gc/39653-2011613-updates.webp"}
          alt={row.name}
          refferredPolicy="no-referrer"
          className="w-12 h-12 rounded-full"
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

  ];

  return (
    <div className="w-11/12 mx-auto my-5 font-mono">
      <Helmet>
        <title>HR | Add Employee</title>
      </Helmet>
      <div className="mb-8 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Package Section</h2>
        <p className="text-center mb-4">Team Member Count: {teamMemberCount}</p>
        <div className="text-center">
          <button
            onClick={handleIncreaseLimit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Increase Package Limit
          </button>
        </div>
      </div>

      {/* Employee List*/}
      <div className="mb-8 p-4 border dark:bg-black dark:text-white border-gray-300 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Employees</h2>
        <div className="w-9/12 mx-auto">
          <DataTable
            className="dark:bg-black dark:text-white"
            title="Unaffiliated Employees"
            columns={columns}
            data={employees}
            pagination
            highlightOnHover
            striped
            responsive
          />
        </div>
        <div className="text-center mt-4">
          <button
            onClick={handleAddToTeam}
            className="btn btn-outline dark:bg-black dark:text-white border-b-4 border-b-orange-200"
          >
            Add Selected Employees to Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
