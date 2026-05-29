require("dotenv").config();
const app = require("./app");
console.log("JWT:", process.env.JWT_SECRET);
console.log("Cloudinary:", process.env.CLOUDINARY_API_KEY);
const connectDB = require("./db");

const startServer = async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT || 9000, () => {
      console.log(`server is running on port ${process.env.PORT}`);
    });

  } catch (error) {
    console.log("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

process.on("unhandledRejection", (reason) => {
  console.log("❌ UNHANDLED REJECTION RAW:");
  console.dir(reason, { depth: null });
});

process.on("uncaughtException", (err) => {
  console.log("❌ UNCAUGHT EXCEPTION:");
  console.dir(err, { depth: null });
});