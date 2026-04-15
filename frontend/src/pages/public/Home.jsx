import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBolt, FaCreditCard, FaHamburger, FaShoppingCart, FaUtensils } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">

      <div
        className="h-[75vh] bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/foo.jpeg')"
        }}
      >

        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to <span className='text-amber-500'>FoodieHub</span> <FaUtensils className="inline text-3xl" />
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-6">
            Order your favorite food anytime, anywhere
          </p>

          <button
            onClick={() => navigate("/menu")}
            className="bg-amber-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-amber-600 transition"
          >
            Explore Menu
          </button>

        </div>
      </div>

      <div className="max-w-6xl mx-auto py-16 px-6 grid gap-8 md:grid-cols-3">
        
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl  transition">
          <h2 className="text-xl font-bold flex flex-wrap gap-4 items-center mb-2"><FaHamburger/>Delicious Food</h2>
          <p className="text-gray-600">
            Choose from a wide variety of tasty meals and snacks.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-xl font-bold flex flex-wrap gap-4 items-center mb-2"><FaBolt/> Fast Delivery</h2>
          <p className="text-gray-600">
            Get your food delivered quickly at your doorstep.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-xl font-bold flex flex-wrap gap-4 items-center mb-2"><FaCreditCard/> Easy Payment</h2>
          <p className="text-gray-600">
            Secure and simple payment with eSewa integration.
          </p>
        </div>

      </div>

      <div className="bg-gradient-to-r from-amber-300 to-amber-600 text-white text-center py-16">
  
  <h2 className="text-3xl font-bold mb-6">
    Ready to order your meal?
  </h2>

  <div className="flex justify-center">
    <button
      onClick={() => navigate("/cart")}
      className="bg-white text-amber-500 px-8 py-3 rounded-full flex items-center gap-2 font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
    >
      <FaShoppingCart className="text-lg" />
      Go to Cart
    </button>
  </div>

</div>

    </div>
  );
};

export default Home;