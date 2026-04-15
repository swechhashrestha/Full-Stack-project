import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { CartContext } from "../context/CartProvider";
import axios from "axios";

const Navbar = () => {
  const baseStyle =
    "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200";
  const activeStyle = "bg-amber-400 text-white";
  const inactiveStyle = "text-gray-700 hover:bg-amber-200";

  const { user, isAuth, setUser, setIsAuth } = useContext(AuthContext);
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      let res = await axios.post(
        "http://localhost:9000/api/auth/users/logout",
        {},
        { withCredentials: true },
      );

      setUser(null);
      setIsAuth(false);

      dispatch({ type: "clear_cart" });

      navigate("/");

      alert(res.data.message);
    } catch (error) {
      console.log("Failed to logout user", error);
    }
  };

  return (
    <nav className="bg-amber-50 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-3xl font-bold text-amber-400">FoodieHub</div>

          <div className="flex space-x-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Menu
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Cart
            </NavLink>

            {user?.role == "admin" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
                }
              >
                Admin
              </NavLink>
            )}

            {user && isAuth ? (
              <button
                className="bg-amber-500 text-white rounded-md px-4 py-2 active:scale-90"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <div className="flex space-x-2">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
                  }
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
                  }
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
