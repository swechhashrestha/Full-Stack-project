const Order = require("../models/order.model");

const createOrder = async (req, res) => {
  const userId = req.user._id;
  const { products } = req.body;

  const order = await Order.create({
    user_id: userId,
    products,
  });

  res.status(201).json({
    message: "Order created successfully",
    order,
  });
};

const success = async (req, res) => {
  try {
    const { data } = req.query;

    if (!data) {
      return res.status(400).json({
        message: "No payment data provided",
      });
    }

    const decoded = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));

    const order = await Order.findById(decoded.transaction_uuid);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      decoded.transaction_uuid,
      {
        paymentStatus: decoded.status || "COMPLETE",
      },
      {
        new: true,
      },
    );

    console.log("Order updated:", updatedOrder);

    res.redirect(`${process.env.FRONTEND_URL}/success/${decoded.transaction_uuid}`);
  } catch (error) {
    console.error("Payment success error:", error);
    res.status(500).json({
       message: "Server error" 
      });
  }
};

const getOrder = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await Order.findById(id)
      .populate("user_id", "fullName")
      .populate("products.product_id", "title price");

    res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user_id", "fullName email")
      .populate("products.product_id", "title price");

    console.log("ORDERS:", JSON.stringify(orders, null, 2));

    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { createOrder, success, getOrder, getOrders };
