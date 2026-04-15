import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/auth/users/all", {
        withCredentials: true,
      });
      setUsers(res.data.users);
    } catch (error) {
      console.log("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:9000/api/auth/users/${id}`,
        { withCredentials: true },
      );
      alert(res.data.message);
      getUsers();
    } catch (error) {
      console.log("Failed to delete user", error);
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        <button
          onClick={() => {
            navigate("/admin/add-user");
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Add New User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium text-gray-800">
                  {user.fullName}
                </td>

                <td className="p-4 text-gray-600">{user.email}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold 
                    ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-4 text-center">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => {
                        navigate("/admin/edit-user", { state: user._id });
                      }}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteUser(user._id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
