import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EditUser = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  const id = location?.state;

  const getUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/users/${id}`,
        { withCredentials: true },
      );
      console.log(res.data.user);
     
      setFullName(res.data.user.fullName);
      setEmail(res.data.user.email);

    } catch (error) {
      console.log("Failed to fetch user", error);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/auth/users/${id}`,
        {
          fullName,
          email,
        },
        { withCredentials: true },
      );

      setFullName("");
      setEmail("");

      navigate("/admin/user-management");
      alert(res.data.message);
    } catch (error) {
      console.log("Failed to register User", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition"
        >
          EDIT
        </button>
      </form>
    </div>
  );
};

export default EditUser;
