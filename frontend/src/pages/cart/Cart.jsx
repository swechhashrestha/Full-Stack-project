import React, { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const createOrder = async () => {
    try {
      const products = state.cart.map((item) => ({
        product_id: item._id,
        quantity: item.quantity,
      }));

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders/create`,
        { products },
        { withCredentials: true },
      );

      const newOrderId = res.data.order._id;
      navigate("/payment", { state: { totalAmount, newOrderId } });
    } catch (error) {
      console.log("Failed to create order", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Your Cart 🛒</h1>

      {state.cart.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {state.cart.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded-lg"
              />

              <h2 className="text-lg font-semibold text-gray-800 mt-3">
                {item.title}
              </h2>

              <p className="text-green-600 font-bold mt-1">Rs. {item.price}</p>

              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      dispatch({ type: "decrease", payload: item._id })
                    }
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400"
                  >
                    −
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => dispatch({ type: "add", payload: item })}
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() =>
                    dispatch({ type: "remove", payload: item._id })
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-2xl shadow-md p-6 h-fit col-span-full sm:col-span-1 md:col-span-1">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Total Items:</span>
              <span>
                {state.cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Total Price:</span>
              <span className="font-bold text-green-600">
                Rs. {totalAmount}
              </span>
            </div>

            <button
              onClick={createOrder}
              className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg mt-10">
          No items in cart
        </div>
      )}
    </div>
  );
};

export default Cart;
