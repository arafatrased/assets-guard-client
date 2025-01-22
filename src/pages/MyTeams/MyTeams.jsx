
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from '@tanstack/react-query';

const MyTeams = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch team members from the server
const { data: teams = [], refetch } = useQuery({
        queryKey: ['teams'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allemployee', {
                params: {
                    role: 'employee',
                },
            });
            return res.data;
        },
    });

//   if (isLoading) {
//     return <div className="p-5 text-center">Loading team members...</div>;
//   }

//   if (isError) {
//     return (
//       <div className="p-5 text-center text-red-500">
//         Failed to load team members: {error.message}
//       </div>
//     );
//   }
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">My Team</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((member) => (
          <div
            key={member._id}
            className="border p-4 rounded-lg shadow flex items-center gap-4"
          >
            {/* Member Image */}
            <img
              src={member.photoURL || member.companyLogo|| 'https://ui-avatars.com/api/?name='}
              referrerPolicy="no-referrer"
              alt={member.displayName}
              className="w-16 h-16 rounded-full object-cover"
            />

            {/* Member Details */}
            <div>
              <h2 className="text-lg font-semibold">{member.displayName}</h2>
              <p className="text-sm text-gray-600">{member.email}</p>

              {/* Member Type */}
              <div className="mt-2 flex items-center gap-2">
                {member.role === "admin" ? (
                  <span
                    className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                    title="Admin"
                  >
                    Admin
                  </span>
                ) : (
                  <span
                    className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                    title="Normal Employee"
                  >
                    Employee
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeams;
