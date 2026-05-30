import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products/`,
        { withCredentials: true },
      );

      setProducts(res.data.products);
    } catch (error) {
      console.log("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        withCredentials: true,
      });
      getProducts();
      alert(res.data.message);
    } catch (error) {
      console.log("Failed to delete product", error);
    }
  };

  if (loading) {
    return (
      <p className="text-center p-10 text-gray-500">Loading products...</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-6">Product Management</h1>

        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Add New Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Price</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>

                  <td className="p-4 font-medium text-gray-800">
                    {product.title}
                  </td>

                  <td className="p-4 text-green-600 font-semibold">
                    ${product.price}
                  </td>

                  <td className="p-4 text-gray-600">
                    {product.description?.slice(0, 60)}...
                  </td>

                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() =>
                          navigate("/admin/edit-product", {
                            state: product._id,
                          })
                        }
                        className="text-blue-500 hover:text-blue-700 font-medium"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="text-red-500 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
