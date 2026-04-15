import React, { useContext } from "react";
import PublicLayout from "../layouts/PublicLayout";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/public/NotFound";
import AdminDashboard from "../admin/AdminDashboard";
import ProductManagement from "../admin/ProductManagement";
import OrderManagement from "../admin/OrderManagement";
import UserManagement from "../admin/UserManagement";
import AddUser from "../admin/AddUser";
import EditUser from "../admin/EditUser";
import Menu from "../pages/public/Menu";
import ProductDetails from "../pages/public/ProductDetails";
import Cart from "../pages/cart/Cart";
import Payment from "../pages/payment/Payment";
import Success from "../pages/payment/Success";
import AddProduct from "../admin/AddProduct";
import EditProduct from "../admin/EditProduct";
import Protected from "../components/Protected";
import { AuthContext } from "../context/AuthProvider";

const AppRoutes = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="menu" element={<Menu />} />
          <Route path="/menu/:id" element={<ProductDetails />} />
          <Route
            path="cart"
            element={
              <Protected>
                <Cart />
              </Protected>
            }
          />
          <Route path="payment" element={<Payment />} />
          <Route path="/success/:id" element={<Success />} />
          <Route path="*" element={<NotFound />} />

          {user?.role == "admin" && (
            <Route path="admin/" element={<AdminDashboard />}>
              <Route
                path="product-management"
                element={<ProductManagement />}
              />
              <Route path="order-management" element={<OrderManagement />} />
              <Route path="user-management" element={<UserManagement />} />
              <Route index element={<UserManagement />} />
              <Route path="add-user" element={<AddUser />} />
              <Route path="edit-user" element={<EditUser />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="edit-product" element={<EditProduct />} />
            </Route>
          )}
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
