import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const location = useLocation();
  const id = location?.state;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9000/api/products/${id}`,
        { withCredentials: true }
      );

      const product = res.data.product;

      setTitle(product.title);
      setPrice(product.price);
      setDescription(product.description);

    } catch (error) {
      console.log("Failed to fetch product", error);
    }
  };

  useEffect(() => {
    if (id) getProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      const res = await axios.patch(
        `http://localhost:9000/api/products/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      alert(res.data.message);

      navigate("/admin/product-management");
    } catch (error) {
      console.log("Failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Edit Product</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            Product Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

         <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">
            Product Image
          </label>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
              id="imageUpload"
            />

            <label
              htmlFor="imageUpload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <span className="text-gray-500">
                Click to upload or drag & drop
              </span>
              <span className="text-xs text-gray-400 mt-1">
                PNG, JPG, JPEG up to 5MB
              </span>
            </label>
          </div>

          {image && (
            <div className="mt-4 flex justify-center">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg shadow"
              />
            </div>
          )}
          </div>

        <button className="w-full bg-amber-500 text-white py-2 rounded-lg">
          EDIT
        </button>
      </form>
    </div>
  );
};

export default EditProduct;