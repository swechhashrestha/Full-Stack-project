const Product = require("../models/product.model");
const uploadOnCloudinary = require("../utils/cloudinary");

const createProduct = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    let imageUrl = null;

    if (req?.file?.path) {
      const uploadResult = await uploadOnCloudinary(req.file.path);
      if (uploadResult?.secure_url) {
        imageUrl = uploadResult.secure_url;
      }
    }

    const product = await Product.create({
      title,
      description,
      price,
      image: imageUrl,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length < 0) {
      return res.status(404).json({
        message: "Products not found",
      });
    }

    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const editProduct = async (req, res) => {
  const { id } = req.params;

  const { title, description, price } = req.body;

  const updateData = { title, description, price }

  if (req?.file) {
    const res = await uploadOnCloudinary(req.file.path);
    updateData.image = res.secure_url;
  }

  const product = await Product.findByIdAndUpdate(
    id,
    { $set:updateData},
    { new: true },
  );

  res.status(201).json({
    message: "Product updated successfully",
    product,
  });
};

module.exports = {
  createProduct,
  fetchProducts,
  deleteProduct,
  getProduct,
  editProduct,
};
