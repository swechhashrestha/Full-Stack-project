const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    let hashPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      fullName,
      email,
      password: hashPassword,
    });

    let token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.cookie("token", token);

    res.status(201).json({
      message: "user registered successfully",
      user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "invalid email or password",
      });
    }

    let isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "invalid email or password",
      });
    }

    let token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.cookie("token", token);

    res.status(200).json({
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

const getUser = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: "User fetched successfully",
    user,
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (users.length < 0) {
      return res.status(404).json({
        message: "Users not found",
      });
    }

    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  let user = await User.findOne({ _id: id });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  await User.findByIdAndDelete(id);

  res.status(200).json({
    message: "User deleted successfully",
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });

  res.status(200).json({
    message: "User fetched successfully",
    user,
  });
};

const editUser = async (req, res) => {
  const { fullName, email } = req.body;

  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  await User.findByIdAndUpdate(
    {
      _id: id,
    },
    { fullName, email },
    { new: true },
  );

  res.status(200).json({
    message: "User updated successfully",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getAllUsers,
  deleteUser,
  getUserById,
  editUser,
};
