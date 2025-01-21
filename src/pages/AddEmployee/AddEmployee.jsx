import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import DataTable from "react-data-table-component";
import { useLoaderData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { use } from "react";

const AddEmployee = () => {
  const { user } = useAuth();
  const packageLimit = useLoaderData();
  const [employees, setEmployees] = useState([]);
  const [teamMemberCount, setTeamMemberCount] = useState(0);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Fetch employees who are not affiliated with any company
  const { data, refetch } = useQuery({
    queryKey: ["unaffiliatedEmployees"],
    queryFn: async () => {
      const res = await axiosPublic.get("/unaffiliated-employees");
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
    axiosPublic.get('/allemployee').then(res => {
      setTeamMemberCount(res.data.length)
    })
  }, [currentUser]);


  useEffect(() => {
    if (data) {
      setEmployees(data);
      setTeamMemberCount(data.length);
    }
  }, [data]);

  // Function to handle adding employees to the team
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
    console.log(updatedEmployees);
    setTeamMemberCount(teamMemberCount + selectedEmployees.length);


    const updateUser = {
      emails: updatedEmployees.map(item => item.email), // Collect all emails
      companyName: currentUser.companyName,
    }

    axiosPublic.post('/update-users', updateUser)
      .then(res => {

      })
    // Optionally, update your backend with the new team members.
    // axiosPublic.post('/add-to-team', { employees: updatedEmployees })
    setEmployees((prevState) =>
      prevState.filter((employee) => !selectedEmployees.includes(employee._id))
    );
    setSelectedEmployees([]);
    refetch()
  };

  // Function to handle selecting an employee checkbox
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

  // Define columns for the employee data table
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
      {/* Package Section */}
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

      {/* Employee List Section */}
      <div className="mb-8 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Employees</h2>
        <div className="w-9/12 mx-auto">
          <DataTable
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
            className="btn btn-outline border-b-4 border-b-orange-200"
          >
            Add Selected Employees to Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
