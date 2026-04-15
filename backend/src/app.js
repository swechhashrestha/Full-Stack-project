const express = require("express");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const orderRouter = require("./routes/order.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

module.exports = app;
