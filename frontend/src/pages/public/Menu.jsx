import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getProducts = async () => {
    try {
      setLoading(true);
      let res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/`);
      console.log(res.data);
      setProducts(res.data.products);
    } catch (error) {
      console.log("Failed to fetch products", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Our Menu</h1>

      {loading ? (
        <p className="text-center text-lg font-medium">Loading...</p>
      ) : products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              onClick={() => {
                navigate(`/menu/${product._id}`, { state: product });
              }}
              key={product._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h2>

                <h3 className="text-amber-600 font-bold mt-2">
                  Rs. {product.price}
                </h3>

                <button
                  onClick={() => {navigate(`/menu/${product._id}`, { state: product })}}
                  className="mt-4 w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-400 "
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg">
          No Products Available
        </div>
      )}
    </div>
  );
};

export default Menu;
