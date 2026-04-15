import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Success = () => {
  const [order, setOrder] = useState({});
  const { id } = useParams();

  const getOrder = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/api/orders/${id}`);
      setOrder(res.data.order);
    } catch (error) {
      console.log("Failed to fetch order", error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg space-y-5">
        
        <h1 className="text-2xl font-bold text-center text-green-600">
          Payment {order?.paymentStatus || "Success"} ✅
        </h1>

        <div className="border rounded-lg p-4 bg-gray-50">
          <p className="text-sm text-gray-500">Transaction ID</p>
          <p className="font-semibold text-gray-800">
            {order?._id || "N/A"}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-700">
            Ordered Products
          </h2>

          {order?.products?.map((product) => (
            <div
              key={product.product_id}
              className="border border-gray-200 rounded-lg p-3 flex justify-between items-center"
            >
              <div>
                <p className="text-gray-800 font-medium">
                  Product ID: {product.product_id}
                </p>
                <p className="text-sm text-gray-500">
                  Quantity: {product.quantity}
                </p>
              </div>

              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                x{product.quantity}
              </span>
            </div>
          ))}
        </div>

        {order?.products?.length === 0 && (
          <p className="text-center text-gray-500">
            No products found.
          </p>
        )}

        <button
          onClick={() => window.location.href = "/"}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 active:scale-95 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Success;