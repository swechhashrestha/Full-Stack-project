import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../../context/CartProvider";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  const { dispatch } = useContext(CartContext);

  if (!product) {
    return (
      <div className="text-center mt-10 text-gray-500">No product found</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
     
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg max-w-4xl mx-auto grid md:grid-cols-2 gap-6 overflow-hidden">
       
        <div className="w-full h-80 md:h-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Rs. {product.price}
            </h2>

            <button
              onClick={() => {
                dispatch({ type: "add", payload: product });
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 active:scale-95 transition transform duration-150"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
