import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/orders/", {
        withCredentials: true,
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.log("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "failed":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage and track all customer orders
        </p>
      </div>

     
      <div className="bg-gray-50 rounded-2xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          
          <thead className="bg-gray-200 text-gray-600 text-sm uppercase ">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">User</th>
              <th className="p-4">Products</th>
              <th className="p-4">Payment Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 text-sm text-gray-700">
                    #{order._id.slice(-6)}
                  </td>

                  <td className="p-4">
                    <div className="font-medium text-gray-800">
                      {order.user_id?.fullName}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="space-y-1">
                      {order.products?.map((item, i) => (
                        <div
                          key={i}
                          className="text-sm text-gray-600 flex justify-between"
                        >
                          <span>{item.product_id?.title}</span>
                          <span className="text-gray-400">
                            {item.quantity} items
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                        order.paymentStatus,
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-10 text-center text-gray-400">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
