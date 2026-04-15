import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {user, isAuth, setUser, setIsAuth } = useContext(AuthContext);
  console.log(user, isAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        "http://localhost:9000/api/auth/users/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      setEmail("");
      setPassword("");
      setUser(res.data.user);
      setIsAuth(true);
      navigate("/");
      alert(res.data.message);
    } catch (error) {
      console.log("Failed to Login User", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
