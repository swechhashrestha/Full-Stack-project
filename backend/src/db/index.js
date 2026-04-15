const mongoose = require("mongoose");

async function connectDB(){
  try {
    await mongoose.connect("mongodb://localhost:27017/momo")
      console.log("Database connected successfully");
  } catch (error) {
    console.log("Failed to connect to database", error);
  }
}

module.exports= connectDB;